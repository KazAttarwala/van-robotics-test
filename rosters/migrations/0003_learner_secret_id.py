# Generated by Django 4.2 on 2023-05-23 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rosters', '0002_remove_learner_classbatch_learner_classbatch'),
    ]

    operations = [
        migrations.AddField(
            model_name='learner',
            name='secret_id',
            field=models.TextField(blank=True, max_length=100, null=True),
        ),
    ]