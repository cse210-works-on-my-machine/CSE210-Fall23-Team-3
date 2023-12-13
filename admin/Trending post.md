# Trending post specification

> To get the trending posts from the mastodon instances, we first perform an API call to `https://mastodon.social/api/v1/` to get the trending tags in the mastodon instance. You could replace the URL with the URL of the preferred instance. Once the trending tags are fetched, a line of API calls are made to `https://mastodon.social/api/v1/timelines/tag/:` with each of the tags appended to the URL to get the trending posts for each of the tags. Initally, this was done serially which caused the page to load really slow. To overcome this, we parellized API calls to reduce the load time to one-fourth.

> For getting the trending posts from lemmy, it is much simpler as there is only one API call to `https://lemmy.ml/api/v3/post/list?sort=Hot` to get the trending posts from. The URL for the API call could be changed accordingly to get the trending posts from the required Lemmy instance.
