import csv
from faker import Faker

fakeEN = Faker()
fakeRU = Faker('ru_RU')

users = []
students = []
tutors = []
for id in range(1000):
    first_name = fakeRU.first_name()
    last_name = fakeRU.last_name()
    username = fakeRU.user_name()
    password = fakeRU.password()
    role = 'student' if fakeRU.random.random() < 0.9 else 'tutor'
    user = (id, first_name, last_name, role, username, password)
    users.append(user)
    if role == 'student': students.append(user)
    if role == 'tutor': tutors.append(user)

texts = []
for id in range(50):
    creator_id = fakeEN.random.choice(tutors)[0]
    title = fakeEN.text(40)
    content = fakeEN.text(2000)
    texts.append((id, creator_id, title, content))

study_groups = []
for id in range (100):
    tutor_id = fakeEN.random.choice(tutors)[0]
    title = 'Group of ' + fakeEN.text(20)
    students_count = fakeEN.random.randint(10, 18)
    studs = tuple(fakeEN.random.sample(students, k=students_count))
    group = (id, title, tutor_id, studs)
    study_groups.append(group)

with open('users.csv', 'w') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(('id', 'first_name', 'last_name', 'role', 'username', 'password'))
    writer.writerows(users)

with open('texts.csv', 'w') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(('id', 'creator_id', 'title', 'content'))
    writer.writerows(texts)

with open('study_groups.csv', 'w') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(('id', 'title', 'tutor_id'))
    writer.writerows(s[:-1] for s in study_groups)

with open('study_groups_users.csv', 'w') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(('group_id', 'student_id'))
    for group in study_groups:
        writer.writerows((group[0], s[0]) for s in group[-1])
