from rest_framework import serializers
from rosters.models import ClassBatch, Learner

class LearnerViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Learner
        fields = ('id', 'first_name', 'last_name', 'grade', 'classbatches')

class ClassBatchViewSerializer(serializers.ModelSerializer):
    learners = LearnerViewSerializer(
        many=True, 
        read_only=True
    )

    class Meta:
        model = ClassBatch
        fields = ('id', 'name', 'instructor', 'learners')

