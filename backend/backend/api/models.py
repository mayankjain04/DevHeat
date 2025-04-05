from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import User

class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image_url = models.URLField(max_length=500, blank=True, null=True)  # URL for profile image
    bio = models.TextField(blank=True, null=True)
    skills = models.JSONField()  # Stores skill names and levels as a JSON object
    domain = models.CharField(max_length=100)
    experience = models.IntegerField()

    # New fields to store model response
    predicted_proficiency = models.CharField(max_length=100 ,null=True, blank=True)
    predicted_job_role = models.CharField(max_length=100, null=True, blank=True)
    predicted_average_score = models.FloatField(null=True, blank=True)

    def clean(self):
        # Custom validation for skills field
        if len(self.skills) < 8:
            raise ValidationError("The 'skills' field must contain at least 8 key-value pairs.")

    def save(self, *args, **kwargs):
        self.clean()  # Run clean to enforce validation before saving
        super(UserData, self).save(*args, **kwargs)
