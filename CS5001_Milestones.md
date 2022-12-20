## CS5001

Nicholas Jefferis

Casey Schablein

Mark Tarbell

## Milestones:
1. User Authentication/Login and API
In order to retrieve a user’s top items or create a playlist for them, we first need to have them sign into their Spotify account and give us these permissions.
Receiving an access token will allow us to utilize Spotify’s API which is necessary for the core of our app. This includes searching for songs or artists to seed,
personal items, creating playlists, and most importantly, retrieving the recommendations. 

2. Retrieving and Playing Audio Snippets
We believe that Spotify’s API will return a “preview” in each song object, but if that fails, we have brainstormed alternative routes for playing song 
snippets. This is a major milestone, since a large appeal of our app is the quick sampling of a song before making your decision.

3. Seeding
Ideally, we will have a seeding system where the user can choose seeds for the recommendations to be based on. If all goes according to plan, we will be 
able to seed based on up to five specific artists, specific songs, user’s top songs, or a user’s top artists. This also means that we need to have a working 
search capability.

4. Swiping
This is the main selling point of the app. A functioning swiping system will allow the user to swipe left or right on a song. A swipe left will mean a 
“dislike” where the song will be filtered out of all future recommendations. A swipe right will mean a “like” where the song will be added to a “matches” list. 
The user will be able to export this list to their Spotify account where they can listen back to all their new songs. 

5. Analytics
We will track some stats about user interaction. A user will be able to look back at their stats such as swipe right percentage, number of songs, top genres,
and possibly tracking trends over time. 
