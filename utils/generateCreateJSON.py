import glob
import re
import random
import string
import json
import csv


def randomString(stringLength=8):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


def jsonFromCSV(name="submissionForm.csv"):
    # CSV order
    # Timestamp, email, name, art, artwork link, title, tags, description, website, twitter, instagram, facebook, email flag
    # email:1, artist:2, url:3, alt. url:4, title:5, tags:6, description:7
    createJSON = {"art": {}}

    with open(name, 'r', encoding="utf-8") as file:
        reader = csv.reader(file)
        next(reader)  # skip labels
        for row in reader:
            key = randomString()
            createJSON["art"][key] = {}
            art = createJSON["art"][key]
            emailFlag = row[12]

            if emailFlag == "Yes":
                art["email"] = row[1]

            if row[2] != "":
                art["artist"] = row[2]
            if row[3] != "":
                art["url"] = row[3]
            if row[4] != "":
                art["media"] = row[4]
            if row[5] != "":
                art["title"] = row[5]
            if row[6] != "":
                art["tags"] = row[6]
            if row[7] != "":
                art["description"] = row[7]
            if row[8] != "":
                art["website"] = row[8]
            if row[9] != "":
                art["twitter"] = row[9]
            if row[10] != "":
                art["instagram"] = row[10]
            if row[11] != "":
                art["facebook"] = row[11]

    with open('create.json', 'w') as outfile:
        json.dump(createJSON, outfile)


def jsonFromDir():
    createJSON = {"art": {}}

    for file in glob.glob("../img/create/*"):
        key = randomString()
        url = file.split("create/")[1]
        artist = url.split(".")[0]

        firstName = re.search("^[A-Z][-a-z]+", artist)[0]
        lastName = re.search("^[A-Z][-a-z]+", artist[len(firstName):])[0]

        artist = firstName + " " + lastName

        createJSON["art"][key] = {}
        createJSON["art"][key]["url"] = url
        createJSON["art"][key]["artist"] = artist

    with open('create.json', 'w') as outfile:
        json.dump(createJSON, outfile)


jsonFromCSV()
