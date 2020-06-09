''' 
This file is used to ge through and upload metadata to cloud
storage for artist submissions
'''

#imports
import os
from google.cloud import firestore
import google.auth

# can potentially execute the cloud utils rsync here if we want all in one

# authorization and connect method
def cloudConnect(debug=False):
    # let's connect and add a new document
    # get credentials
    # use credentials to login to client
    # return the client instance
    db = firestore.Client()
    
    if debug:
        print("Connected to cloud")

    return db

def uploadData(db, directory, debug=False):
    # when we get to the final version, this will use directory to be specific

    doc_ref = db.collection(u'artists').document(u'johndoe')
    
    # fill in the document's metadata
    # name, email and first contact date
    doc_ref.set({
        u'name': u'John Doe',
        u'email': u'john.doe@gmail.com',
        u'fc_date': u'01/01/2020'
    })
    
    # check if it worked
    users_ref = db.collection(u'artists')

    for doc in users_ref.stream():
        print(u'{} => {}'.format(doc.id, doc.to_dict()))

    # create a subcollection for the image metadata

    # go through each of the images uploaded and fill in their metadata

    if debug:
        print("Uploaded artist and image metadata")

# function to go through each folder and upload the artist and image metadata
# use last upload time to determine whether to change metadata?
def uploadArtistMetadata(artist="", debug=False):
    # use the artist name to open the right folder. If no argument, go through
    # all folders.
    #if not artist:
    for roots, dirs, files in os.walk("."):
        # we only care about the directories at this point
        for directory in dirs:
            if artist:
                if artist != directory:
                    continue
                
                # here we know that we found artist
                if debug:
                    print("Found {} for {}".format(directory, artist))
                uploadData(directory, debug)
                return # finished at this point

            uploadData(directory, debug)
# main 
def main(debug=False):
    # get client and authorize the credentials locally
    # connect to our Firestore database
    cloudConnect(debug)

    # get the document that we are going to be uploading to
    print("What is the name of the artist?")
    artist = input("Input the name here: ")
    
    uploadArtistMetadata(artist, debug)
 
    print("Finished uploading info for {}".format(artist))

if __name__ == "__main__":
    print("Starting Upload to isolating together cloud database")
    main(debug=True)
