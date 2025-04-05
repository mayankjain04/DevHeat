# curl -X POST "http://127.0.0.1:8000/api/register/" -H "Content-Type: application/json" -d '{"username": "mayank", "password": "mayank", "email": "mayank@gmail.com" }'
# curl -X POST "http://127.0.0.1:8000/api/logout/" -H "Authorization: Token 962fb18620e985aef9d7ce7ca8a5b49b06457e47"
# curl -X POST "http://127.0.0.1:8000/api/login/" -H "Content-Type: application/json" -d '{ "username": "admin", "password": "admin"}'
# curl -X POST http://127.0.0.1:8000/api/assessment/ \
#      -H "Content-Type: application/json" \
#      -H "Authorization: Token ab493fd76a89f65774fb6d0fb808eee8de7423e0" \
#      -d '{
#            "skills": {
#              "Skill1": 25,
#              "Skill2": 25,
#              "Skill3": 10,
#              "Skill4": 45,
#              "Skill5": 25,
#              "Skill6": 40,
#              "Skill7": 10,
#              "Skill8": 14
#            },
#            "domain": "data science",
#            "experience": 0
#          }'

curl -X GET http://127.0.0.1:8000/api/user/ -H "Content-Type: application/json" -H "Authorization: Token 2f3a7b177c80f7edda2031f7a31c2cffda53e261"