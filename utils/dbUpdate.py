#imports
import os
#dependencies

# can potentially execute the cloud utils rsync here if we want all in one

# authorization and connect method
def cloudConnect(debug=False):
    if debug:
        print("Connected to cloud")

def uploadData(debug=False):
    if debug:
        print("Uploaded artist and image metadata")
        # fill in the document's metadata

        # create a subcollection for the image metadata

        # go through each of the images uploaded and fill in their metadata

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
                uploadData(debug)
                return # finished at this point

            uploadData(debug)
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
