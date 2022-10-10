import csv
import requests

host = 'http://localhost:3000/api/v1'
headers = {
    'accept': '*/*',
    'Content-Type': 'application/json'
}

with open('users.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)
    for line in reader:
        id, first_name, last_name, role, username, password = line
        user = {
            'first_name': first_name,
            'last_name': last_name,
            'role': role
        }
        requests.post(f'{host}/users', json=user, headers=headers)

with open('texts.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)
    for line in reader:
        id, creator_id, title, content = line
        text = {
            'title': title,
            'content': content
        }
        requests.post(f'{host}/texts', json=text, headers=headers)

