# AlgoNum Guessing Game

### Description
AlgoNum Guessing Game is A Decentralized WebApp using Algorand Smart Contract. It utilizes global and local states for storing and managing values. The player need to guess a random number from a specfic range (1 to 50), and they need to guess it before their given limited chances runs out.
<br>
Players can earn many points as they can

## Subroutines in Smart Contracts and their uses


### join_and_play : 

In this Subroutine, it will count the number of players(global_players_count), how many times does a player play (play_count) and registers the user that will enter the Number Guessing Game for the first time (regNumGame).
<br>
Next time the player enters the game , the Subroutine will evaluate whether if the player had registered in the past or not, if regNumgame is equal to 1 then only play_count will be incremented to 1 . <br>
If regNumgame is 0 ,it will proceed to the next condition where the global_players_count will be increase to one and also the play_count and set the regNumgame to 1 , meaning the player has successfully joined(or registered) the game and they can now play.<br>
ADDITIONAL : <br> The chances default value will be set to 5 as the player enters the game <br>                                           

### guess : <br>
This Subroutine has local_chances (in which the default value is 5) and isGuessOver (default is 0) .<br>
If the local_chances is equals to 0, then the isGuessOver will be set to 1 (Meaning the game is over) . If not, then the player can still have the opportunity to guess the secret random number until the chances runs out

### add_points : <br>
The time that the user guessed the secret number correctly, the points (local_points) will be incremented to 1

### play_again : <br>
This Subroutine will set the number of chances(local_chances) back to 5 and isGuessOver will be set to 0 (Meaning you can now play the game again) Regardless if you guessed the number or not, this will help the player to go back to the game


## How to play

### Connect to pera wallet
Users needs to connect to the pera wallet first before playing. A QR code will appear and they need to scan it and then click "Connect" to connect to the web application

### Opt-In 
After Connecting, The users must click the  Opt-in button in order to access local storage / data 

### Home
After you Opt-in, You will can now access the homepage.<br>
At the homepage, you will see a Play button, you need to click it to proceed to the main gamepage.<br>
The first time you click it, you will be automatically registered. You can also check on how many times did you play the game below the button.<br>

### Main Gamepage
You need to guess a random number from 1 to 50. You will be given a 5 chances (+1 for Bonus guess).<br>
Put the number of your choice in an input, and click "guess" button. confirm the transaction on your pera wallet and you will see the result of your guess.<br>
Everytime you made a wrong guess, the chances will be decreasing. So make a strategy on how to guess the random number as soon as possible.

### Game Over
As the chances is equals to 0, the isGuessOver will be set to 1 or the game is over.<br>
Click  "play again" Button to set the isGuessover to 0 and the chances will return to its default value which is 5 so that you can play the game again.

### Success
If you will be able to guess the number, the points (local_points) will be updated, you will be given a 1 point
every correct guess you made.<br>
Same as the Game Over, you need to click the "play again" button to go back to the game page and set the default value of chances to 5. <br>

![Alt text](app%201.PNG)<br>
![Alt text](app%202.PNG)<br>
![Alt text](app%203.PNG)<br>

### Application ID
252236904
https://testnet.algoexplorer.io/application/252236904 

### Front-end
 This is the repository of the front - end :<br>
 https://github.com/ramdio12/number_guessing_game_frontend
 
### Demo Website
Here is the [link](https://number-guessing-game-frontend.vercel.app/) to the website.

### Smart Contact
Here's the  to the dApp's smart contract.
[link](https://github.com/ramdio12/number_guessing_game.git)

### Video Demonstration
To see the video demonstration:<br>
[link](https://drive.google.com/file/d/1BzjapA6Wx-hb6k9QDECWQAJTu1fLuqUg/view?usp=drive_link)
