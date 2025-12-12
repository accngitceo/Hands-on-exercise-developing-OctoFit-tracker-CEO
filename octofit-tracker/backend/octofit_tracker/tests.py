from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class OctoFitModelsTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team', description='A test team')
        self.user = User.objects.create(name='Test User', email='testuser@example.com', team=self.team)
        self.workout = Workout.objects.create(name='Test Workout', description='A test workout')
        self.activity = Activity.objects.create(user=self.user, activity_type='Running', duration=30, date=timezone.now().date())
        self.leaderboard = Leaderboard.objects.create(team=self.team, total_points=100)

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'Test User')
        self.assertEqual(self.user.team, self.team)

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Test Team')

    def test_activity_creation(self):
        self.assertEqual(self.activity.user, self.user)
        self.assertEqual(self.activity.activity_type, 'Running')

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Test Workout')

    def test_leaderboard_creation(self):
        self.assertEqual(self.leaderboard.team, self.team)
        self.assertEqual(self.leaderboard.total_points, 100)
