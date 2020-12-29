Melbourne Reboot Pseudocode

Code Perspective

Input - type box
User chooses from a selection of catergories i.e. Suburb, Result Number

Input - slider
User also chooses their radius on a slider from 0 - 30km

Input - checkbox 
User also checks boxes of what catergory eg Type (restaurant/cafe/entertainment etc) (input - checkbox)

Add event listener to search button 
We get input from user - store input in variables 
Create query - js
    => Open weather query (Melbourne)
    => Current day/date
    => Google place 
    => Google maps  
    => resting API on homepage (date & weather)

Run query with chosen variables 

Display result 
    => display results on a new page
    => top 5 or 10 results displayed a grid of cards
    => on card displays name + opening hours + image + address + rating + google maps link w/pin drop icon

Local storage - user can 'star' their favourite result options

This will then be displayed in a favourite dropdown option in navbar 

When user clicks on favourites option in the menubar they will be taken to another page to view their list

User can 'unstar' their favourites if they no longer want to see it displayed 
    => js clear function 

Website must be device responsive - mobile first! 


User Story 

As a person in Melbourne who wants to support local businesses post lockdown, I want to be able to enter my current location, chosen radius and interests to generate a list of things to do or visit within those parameters. 

I want to be able to save my favourite results and be able to view them at a later time. I also want to be able to remove any results from the list by unclicking the star once I have visited the place or no longer want to see it. 

Extras 

Invite/Share favourites with friends
Local weather dependant for each result (location dependant)
PT result for chosen result 
Website link to chosen location