# Project Specifications for Team 3

**Project: Blend**
These updated project decisions were made in meetings, in-person, and on Slack on November 8th and 9th. 
Much of the material was also taken from the initial pitch slides.


## The problem

> The Fediverse is "difficult to get into and hard to navigate."

> There is no “central hub” for the Fediverse, finding users and communities to interact with is difficult.

- After trying out the Fediverse ourselves and asking friends to try it out, this was the most prominent problem that came up.


## User personas
Jack - "How do I get started?"
- Jack is a digital marketer who is active on various social media platforms. 
- Frustrations
    - Get tired of staying active on all the mainstream social media platforms and want to try something new. 
- Heard about Fediverse before, but lack of knowledge about it and find it overwhelming and confusing.
- Needs
    - a user-friendly platform that explains the concept of the Fediverse and helps him to find posts and communities to get started. 

Aaron - "Where can I find something new?"
- Aaron is a tech-savvy and a Masters student major in CS who constantly using Mastodon. 
- Frustrations
    - Wants to find new people to follow, and wants to get into using different platforms
    - Wants to find posts and people related to a trending topics
- Needs
    - A way to find content and users beyond his current connections


## Changes from initial pitch: the new idea
Our initial pitch was "A Personalizable, Realtime, Multi-Instance Discovery Homepage."

During our pitch, the professor gave us feedback that our idea might work better as a website, broadly showcasing "what's happening across the fediverse." We liked the idea, as it solved our problem well, and we also realized that the personalizable aspect of our original idea might be overly ambitious for the limited time that we have in this class. 

We therefore pivoted our idea to a website with our driving question being "What's happening across the fediverse?" Users should be able to go to this website for an answer to that question. 


## Project features and key points
This pivot from our initial pitch changed our MVP features in a few notable ways:
1. We now planned for our MVP to include support for multiple networks, instead of it being a stretch goal (like in our original project).
2. The website would now not require users to login or set preferences, and would be a streamlined experience: the user would just visit the website and see posts.
3. The user can customize which instances they see, with a predefined default list to begin with.
4. The personalizable color schemes feature has been moved to the stretch goals section.

The project's feature goals are as follows:

### MVP
- A single feed with trending posts from "across the fediverse."
- Basic recommendation algorithm
- User-customizable list of instances to draw from, stored in local storage
- Caching for local-first design
- Integration with Mastodon and Lemmy (as combining platforms is our main goal)

### Stretch goals
- Advanced recommendation algorithm
- More platforms (PeerTube, Pixelfed, etc.)
- Customizable UI themes
- A way to share customized instance lists among devices