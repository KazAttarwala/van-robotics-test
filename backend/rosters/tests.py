from django.test import TestCase
from .models import Learner, ClassBatch

# Create your tests here.
class LearnerTestCase(TestCase):
    def setUp(self):
        Learner.objects.create(first_name='John', last_name='Doe')
    
    def test_learner_creation(self):
        learner = Learner.objects.get(first_name='John')
        self.assertEqual(learner.last_name, 'Doe')

    def test_learner_deletion(self):
        learner = Learner.objects.get(first_name='John')
        learner.delete()
        self.assertEqual(Learner.objects.count(), 0)
    
    def test_learner_update(self):
        learner = Learner.objects.get(first_name='John')
        learner.first_name = 'Jane'
        learner.save()
        self.assertEqual(learner.first_name, 'Jane')
    
    def test_learner_retrieval(self):    
        learner = Learner.objects.get(first_name='John')
        self.assertEqual(learner.first_name, 'John')
    
    def test_learner_retrieval_all(self):    
        learner = Learner.objects.all()
        self.assertEqual(learner.count(), 1)

class ClassBatchTestCase(TestCase):
    def setUp(self):
        ClassBatch.objects.create(name='Math Class', instructor='Math Instructor')
    
    def test_classbatch_creation(self):
        classbatch = ClassBatch.objects.get(name='Math Class')
        self.assertEqual(classbatch.instructor, 'Math Instructor')

    def test_classbatch_deletion(self):   
        classbatch = ClassBatch.objects.get(name='Math Class')
        classbatch.delete()
        self.assertEqual(ClassBatch.objects.count(), 0)

    def test_classbatch_update(self):   
        classbatch = ClassBatch.objects.get(name='Math Class')
        classbatch.name = 'Science Class'
        classbatch.save()
        self.assertEqual(classbatch.name, 'Science Class')

    def test_classbatch_retrieval(self):    
        classbatch = ClassBatch.objects.get(name='Math Class')
        self.assertEqual(classbatch.name, 'Math Class')

    def test_classbatch_retrieval_all(self):    
        classbatch = ClassBatch.objects.all()
        self.assertEqual(classbatch.count(), 1)


    

  