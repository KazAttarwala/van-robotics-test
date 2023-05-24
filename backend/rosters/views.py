from django.shortcuts import render
from rest_framework import generics

from rosters.models import ClassBatch, Learner
from rosters.serializers import (
    ClassBatchViewSerializer, LearnerViewSerializer
)

# Class Batch Views
class ClassBatchView(generics.RetrieveAPIView):
    serializer_class = ClassBatchViewSerializer

    #def get_related_learners(self):
    #    return Learner.objects.filter(classbatch=self)
    
    def get_queryset(self):
        return ClassBatch.objects.all()#.prefetch_related('learners')

class ClassBatchListView(generics.ListAPIView):
    serializer_class = ClassBatchViewSerializer

    def get_queryset(self):
        return ClassBatch.objects.all()#.prefetch_related('learners')

class ClassBatchUpdateView(generics.UpdateAPIView):
    serializer_class = ClassBatchViewSerializer

    def get_queryset(self):
        return ClassBatch.objects.all()#.prefetch_related('learners')

# Learner Views
class LearnerView(generics.RetrieveAPIView):
    serializer_class = LearnerViewSerializer

    def get_queryset(self):
        return Learner.objects.all()
    
class LearnerListView(generics.ListAPIView):
    serializer_class = LearnerViewSerializer

    def get_queryset(self):
        return Learner.objects.all()

class LearnerDeleteView(generics.DestroyAPIView):
    serializer_class = LearnerViewSerializer
    
    def get_queryset(self):
       return Learner.objects.all()

