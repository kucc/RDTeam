# Generated by Django 3.1.3 on 2020-11-06 15:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round', models.IntegerField()),
                ('state', models.CharField(choices=[('DESCRIBING', '설명'), ('VOTING', '투표 중'), ('GUSSING', '주제 추측 중')], max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=8)),
                ('state', models.CharField(choices=[('WAITING', '대기중'), ('PLAYING', '게임 중')], max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='RoundSubject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject_word', models.CharField(max_length=30)),
                ('round', models.IntegerField()),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.game')),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickname', models.CharField(max_length=50)),
                ('leave', models.BooleanField()),
                ('is_owner', models.BooleanField()),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.room')),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round', models.IntegerField()),
                ('vote_to_kill', models.BooleanField()),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.game')),
                ('target_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='target_user', to='game.user')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to='game.user')),
            ],
        ),
        migrations.CreateModel(
            name='RoundSubjectDescription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round_subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.roundsubject')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.user')),
            ],
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role_name', models.CharField(choices=[('MAFIA', '마피아'), ('CITIZEN', '시민')], max_length=20)),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.game')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.user')),
            ],
        ),
        migrations.AddField(
            model_name='game',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.room'),
        ),
    ]
