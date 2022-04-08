from django.urls import reverse
from django.utils import timezone
from rest_framework import status, test
from main import models
from rest import serializers


class AccountTests(test.APITestCase):
    def setUp(self):
        _ = [
            models.PortionItem.objects.create(**item)
            for item in [
                {"name": "System Chips", "is_default": True},
                {"name": "Thermal Paste", "is_default": True},
                {"name": "Lithium", "is_default": True},
                {"name": "Gigawatts", "is_default": False},
                {"name": "Electrons", "is_default": False},
            ]
        ]
        return super().setUp()

    def test_secure_access(self):
        """
        Ensure endpoints are secured and require authorisation.
        """
        _ = [
            self.assertEqual(
                self.client.get(reverse(endpoint["name"]), format="json").status_code,
                endpoint.get("code", status.HTTP_200_OK),
            )
            for endpoint in [
                {"name": "user-list", "code": status.HTTP_401_UNAUTHORIZED},
                {"name": "portionitem-list"},
                {"name": "trackitem-list", "code": status.HTTP_401_UNAUTHORIZED},
                {"name": "userlog-list", "code": status.HTTP_401_UNAUTHORIZED},
                {"name": "resource-list"},
                {"name": "journal-list", "code": status.HTTP_401_UNAUTHORIZED},
            ]
        ]

    def test_user_creation(self):
        """
        Ensure we can create new users as desired through API.
        """
        url = reverse("user-list")

        response = self.client.post(url, data={"email": "test"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictContainsSubset(
            {
                "email": ["Enter a valid email address."],
                "password": ["This field is required."],
            },
            response.data,
        )

        response = self.client.post(
            url, data={"email": "test@portionmate.co.uk", "password": "abcd"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictContainsSubset(
            {
                "password": [
                    "This password is too short. It must contain at least 8 characters.",
                    "This password is too common.",
                ]
            },
            response.data,
        )

        response = self.client.post(
            url, data={"email": "test@portionmate.co.uk", "password": "TestUser#0001"}
        )
        user = models.User.objects.get(email="test@portionmate.co.uk")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertDictEqual(
            serializers.UserSerializer(user).data,
            response.data,
        )

        result = self.client.login(
            email="test@portionmate.co.uk", password="TestUser#0001"
        )
        self.assertTrue(result)

        response = self.client.patch(
            f"{url}{user.id}/",
            data={
                "email": "test@portionmate.co.uk",
                "forename": "Test",
                "surname": "User",
            },
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset(
            {"forename": "Test", "surname": "User"},
            response.data,
        )

    def test_portion_items(self):
        """
        Ensure we can that portion items work on the endpoint.
        """
        url = reverse("portionitem-list")

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 4)
        self.assertListEqual(
            response.data.get("results"),
            serializers.PortionItemSerializer(
                models.PortionItem.objects.filter(is_default=True),
                many=True,
            ).data,
        )

        response = self.client.post(url, data={"name": "Capacitors"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logging(self):
        """
        Ensure that users are able to log portions (through the API).
        """
        user_credentials = {
            "email": "test@portionmate.co.uk",
            "password": "TestUser#0001",
        }
        self.client.post(reverse("user-list"), data=user_credentials)
        self.client.login(**user_credentials)

        response = self.client.get(reverse("trackitem-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        track_items = models.TrackItem.objects.filter(
            user__email=user_credentials["email"]
        )
        self.assertListEqual(
            serializers.TrackItemSerializer(track_items, many=True).data, response.data
        )

        url = reverse("userlog-list")
        _ = [
            self.assertEqual(
                self.client.post(url, data={"item": item.id}).status_code,
                status.HTTP_201_CREATED,
            )
            for item in track_items
        ]

        self.assertEqual(
            models.UserLog.objects.filter(
                item__user__email=user_credentials["email"],
                timestamp__lte=timezone.now(),
            ).count(),
            track_items.count(),
        )
