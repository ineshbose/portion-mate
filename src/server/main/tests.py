from django.test import TestCase
from django.utils import timezone
from main import models


class MainAppTest(TestCase):
    def setUp(self):
        return super().setUp()

    def test_user_creation(self):
        """
        Ensure we can create new users using emails.
        """
        models.User.objects.create(email="test_user_model@portionmate.co.uk")
        user_queryset = models.User.objects.filter(
            email="test_user_model@portionmate.co.uk"
        )
        self.assertEqual(user_queryset.count(), 1)

        user, result = models.User.objects.update_or_create(
            email="test_user_model@portionmate.co.uk",
            defaults={"forename": "Test", "surname": "User"},
        )
        self.assertFalse(result)
        self.assertEqual(str(user), "Test User")

    def test_portion_items(self):
        """
        Ensure we can create new portion items.
        """
        queryset = [
            models.PortionItem.objects.create(name=item, is_default=True)
            for item in ["Milk", "Honey", "Sugar"]
        ]
        self.assertQuerysetEqual(
            queryset, models.PortionItem.objects.filter(is_default=True)
        )

        non_default_item = models.PortionItem.objects.create(name="Coco")
        self.assertFalse(non_default_item.is_default)

    def test_logs(self):
        """
        Ensure we can log portions for a user and filter.
        """
        user = models.User.objects.create(email="test_logs@portionmate.co.uk")

        portion_items = {
            item["name"]: models.PortionItem.objects.create(**item)
            for item in [
                {"name": "A", "is_default": True},
                {"name": "B", "is_default": False},
                {"name": "C", "is_default": True},
                {"name": "D", "is_default": False},
            ]
        }

        track_items = {
            item: models.TrackItem.objects.create(user=user, item=portion_items[item])
            for item in portion_items
        }

        logs = [
            models.UserLog.objects.create(item=track_items[item])
            for item in track_items
        ]

        self.assertQuerysetEqual(
            logs,
            models.UserLog.objects.filter(
                item__user=user, timestamp__lte=timezone.now()
            ),
        )

    def test_signals(self):
        """
        Ensuring signals are working as desired, like generating passwords.
        """
        user = models.User.objects.create(email="test_signals@portionmate.co.uk")
        self.assertIsNotNone(user.password)

        self.assertQuerysetEqual(
            models.PortionItem.objects.filter(trackitem__user=user),
            models.PortionItem.objects.filter(is_default=True),
        )
