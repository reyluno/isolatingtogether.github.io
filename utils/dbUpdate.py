''' 
This file is used to ge through and upload metadata to cloud
storage for artist submissions
'''

#imports
import datetime
import os
import firebase_admin
from firebase_admin import credentials, firestore
import google.cloud

# can potentially execute the cloud utils rsync here if we want all in one

# authorization and connect method
def cloudConnect(debug=False):
    # let's connect and add a new document
    # get credentials locally
    creds = credentials.Certificate("./firebaseSAkey.json")
    
    # use credentials to login to client
    app = firebase_admin.initialize_app(creds)
    
    # return the client instance
    db = firestore.client()
    
    if debug:
        print("Connected to firebase")

    return db

def uploadData(doc_ref, artist, debug=False):
    # when we get to the final version, this will use directory to be specific
    doc = doc_ref.get()
    if doc.exists:
        # can probably just not show anything if there OR merge
        print(f'Doc data: {doc.to_dict()}')
    else:
        # might be easier to create an artist class later
        print(u'No such document found! Adding a new one.')
        doc_ref.document(artist).set({
            u'name': artist,
            u'email': "{}@gmail.test".format(artist),
            u'upload_time': datetime.datetime.now()
            })
            

    # create a subcollection for the image metadata
    for roots, dirs, files in os.walk("./{}".format(artist)):
        for f in files:
            # go through each of the images uploaded and fill in their metadata
            doc_ref.collection(u'images').document(f).set({
                u'title': f,
                u'upload_date': datetime.datetime.today(),
                u'description': "This is a test image"
                }#, merge=True
                )

    if debug:
        print("Uploaded artist and image metadata")

# function to go through each folder and upload the artist and image metadata
# use last upload time to determine whether to change metadata?
def uploadArtistMetadata(db, artist="", debug=False):
    # use the artist name to open the right folder. If no argument, go through
    # all folders. Currently O(n) but should in theory be O(1). Fix later
    for roots, dirs, files in os.walk("."):
        # we only care about the directories at this point
        for directory in dirs:
            # get document corresponding to artist
            doc_ref = db.collection(u'artists').document(directory)

            if artist:
                if artist != directory:
                    continue
                
                # here we know that we found artist
                if debug:
                    print("Found {} for {}".format(directory, artist))
                uploadData(doc_ref, artist, debug)
                return # finished at this point

            uploadData(doc_ref, directory, debug)
# main 
def main(debug=False):
    # get client and authorize the credentials locally
    # connect to our Firestore database
    db = cloudConnect(debug)

    # get the doc_refument that we are going to be uploading to
    print("What is the name of the artist?")
    artist = input("Input the name here: ")
    
    uploadArtistMetadata(db, artist, debug)
 
    print("Finished uploading info for {}".format(artist))

if __name__ == "__main__":
    print("Starting Upload to isolating together cloud database")
    main(debug=True)
