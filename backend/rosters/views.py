from django.shortcuts import render
from rest_framework import generics

from rosters.models import ClassBatch, Learner
from rosters.serializers import (
    ClassBatchViewSerializer, LearnerViewSerializer
)

# Class Batch Views
#TODO: Refactor to use RetrieveUpdateDestroyAPIView instead of separate views for each operation
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

class ClassBatchDeleteView(generics.DestroyAPIView):
    serializer_class = ClassBatchViewSerializer
    
    def get_queryset(self):
       return ClassBatch.objects.all()#.prefetch_related('learners')
    
class ClassBatchUpdateView(generics.UpdateAPIView):
    serializer_class = ClassBatchViewSerializer

    def get_queryset(self):
        return ClassBatch.objects.all()#.prefetch_related('learners')

class ClassBatchCreateView(generics.CreateAPIView):
    serializer_class = ClassBatchViewSerializer

    def get_queryset(self):
        return ClassBatch.objects.all()#.prefetch_related('learners')
    
# Learner Views 
#TODO: Refactor to use RetrieveUpdateDestroyAPIView instead of separate views for each operation
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

class LearnerUpdateView(generics.UpdateAPIView):
    serializer_class = LearnerViewSerializer

    def get_queryset(self):
        return Learner.objects.all()

class LearnerCreateView(generics.CreateAPIView):
    serializer_class = LearnerViewSerializer

    def get_queryset(self):
        return Learner.objects.all()

