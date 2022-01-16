import graphene
from graphene_django import DjangoObjectType
from main import models


class PortionItemType(DjangoObjectType):
    class Meta:
        model = models.PortionItem
        fields = ["id", "name", "is_default"]


class Query(graphene.ObjectType):
    portion_items = graphene.List(PortionItemType)

    def resolve_portion_items(root, info):
        return models.PortionItem.objects.all()


schema = graphene.Schema(query=Query)
