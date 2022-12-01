CS5001

Nicholas Jefferis

Casey Schablein

Mark Tarbell


## Project Constraints


### Economic

One of the constraints to the development of our project is the economic cost associated with developing and potentially hosting it. As we develop this site, we intend to primarily make use of open-source and free libraries and tools, such as React and node.js. This same consideration will likely be applied to the site’s styling, with many open-source CSS packages such as Bootstrap being available. As of right now, any funds we choose to spend in the future on purchases such as site or database hosting will be supplied personally, and with the potential economic return mainly limited to embedding advertising on the site, in accordance with the Spotify Developer Policy as mentioned below, we will likely stick to unpaid options where available.


### Legal

As we develop our project, as we are heavily relying on the Spotify API to serve content, we will need to be careful to stay within the Spotify Developer Policy. Some of these restrictions are that we must respect users’ data, avoid using the service to promote any endorsements or advertisements, not provide voice control functionality, and several other specifications listed by Spotify. Also, if we use audio preview clips as part of our site’s functionality, we need to link back to the associated full content, and avoid using them to promote unrelated content. Along with this, we must make sure to attribute content from Spotify with the Spotify logo, according to their Design Guidelines. As we near completion of our project, we will need to put additional effort towards confirming we follow these guidelines, in order to ensure its viability.


### Security

One of the more significant constraints for this project is security. Our current intention is that, to use the site’s functionality, users will need to connect their existing Spotify accounts, using the login protocol given by the developer API, in order to allow the site to access the account data, as well as let our application create a playlist and add songs to it. To this effect, we will avoid requesting unnecessary permissions upon Spotify login, to limit the apparent risk to users. Due to this, we intend to use cookies to achieve continuity between site visits, as opposed to having users log into the site separately, or remotely storing user data. If, down the line, we do need to store user data in this or another way, we should encrypt this data in order to ensure it is not abusable in the case of a data breach.
