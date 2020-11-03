import requests
import asyncio


async def add_user_to_db(user):
    try:
        name = user['name']['first'] + ' ' + user['name']['last']
        email = user['email']
        password = user['login']['password']
        user_data = {"name": name, "email": email, "password": password, "confirm": password}
        response = requests.post("http://localhost:5000/auth/register", json=user_data)
        json = response.json()
        id = json['id']   
        photo = user['picture']['large']
        profile_data = {"photo": photo}
        requests.put("http://localhost:5000/profiles/{}".format(id), json=profile_data)
    except: pass


response = requests.get("https://randomuser.me/api/?results=10")
json = response.json()
users = json['results']

async def main():
    statements = []
    for user in users:
        statements.append(add_user_to_db(user))
    await asyncio.gather(*statements)

asyncio.run(main())