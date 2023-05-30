from urllib import response
from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response

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
    queryset = ClassBatch.objects.all()
    
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "ClassBatch deleted successfully"})
    
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
    queryset = Learner.objects.all()
    
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Learner deleted successfully"})

class LearnerUpdateView(generics.UpdateAPIView):
    serializer_class = LearnerViewSerializer

    def get_queryset(self):
        return Learner.objects.all()

class LearnerCreateView(generics.CreateAPIView):
    serializer_class = LearnerViewSerializer

    def get_queryset(self):
        return Learner.objects.all()

