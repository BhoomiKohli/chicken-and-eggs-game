import React from 'react';
import hen from './hen.jpg';
import Moves from './moves';
import Egg from './egg';
import sound from './soundChicken.mp3';
class Background extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            eggLeft: 640,
            eggTop:0,
            eggSpeed: 0,
            basketLeft: 550,
            basketSpeed: 40,
            score: 0,
            showEgg: false,
            playAgain: false,
            start: true
        }
    }
    move(x)
    {
      this.setState(
          {
              basketLeft: this.state.basketLeft + x
          }
      )
    }
    startGame()
    {
        this.setState(
            {
                start: false,
                showEgg: true,
                eggTop: 0,
                eggSpeed: 20
            }
        )
    }
    replay()
    {
        this.setState(
            {
                showEgg: true,
                eggTop: 0,
                playAgain: false,
                eggLeft: Math.floor(Math.random()*(700) + 250),
                score: 0,
                basketLeft: 550,
                eggSpeed:20
            }
        )
        
    }
    componentDidUpdate(prevProps, prevState)
    {
        if(this.state.eggTop==260 && this.state.eggLeft-this.state.basketLeft <=210 && this.state.eggLeft-this.state.basketLeft >=50)
        {
            const audioEl = document.getElementsByClassName("audio-element")[0]
            audioEl.play()
            this.setState(
                {
                    eggTop: 0,
                    eggLeft: Math.floor(Math.random()*(700) + 250),
                    score: this.state.score+ 10
                }
            )
        }
        else if(this.state.eggTop>260&&this.state.eggTop<1000)
        {
            
            this.setState(
                {
                    eggTop: 1000,
                    showEgg: false,
                    playAgain: true
                }
            )
        }
    }
    onKeyPressed(e) {
        if(e.keyCode==37)
        {
            this.setState(
                {
                    basketLeft: this.state.basketLeft- this.state.basketSpeed
                }
            )
        }
        else if(e.keyCode==39)
        {
            this.setState(
                {
                    basketLeft: this.state.basketLeft+ this.state.basketSpeed
                }
            )
        }
      }
    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
        this.timer = setInterval(() => {
          this.setState({ eggTop: this.state.eggTop + this.state.eggSpeed });
        }, 170);
        
      }
    
      componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPressed.bind(this));
        clearInterval(this.timer);
      }
    render()
    {
        return (
            <div className="background" onKeyDown= {this.onKeyPressed}>
                <audio className="audio-element">
                  <source src={sound}></source>
                </audio>

                <div className="upperbg">
                    <div className="hens">
                    <img className= "hen" src= {hen}/>
                    <img className= "hen" src= {hen}/>
                    <img className= "hen" src= {hen}/>
                    <img className= "hen" src= {hen}/>
                    <img className= "hen" src= {hen}/>
                    <img className= "hen" src= {hen}/>
                    <img className= "hen" src= {hen}/> 
                    
                    </div>
                    <div className="score">&nbsp;Score: {this.state.score}</div>
                <br/>
                {this.state.start && <button className="start" onClick = {() => this.startGame()}>Start</button>}
                 {this.state.playAgain && <div className="replay">
                     <div className="gameover">Game Over :(</div>
                     <br/>
                     <button onClick= {() => this.replay() } className="playagain">Play Again :D</button>
                     </div>}
                {this.state.showEgg &&<Egg left= {this.state.eggLeft} top={ this.state.eggTop} speed= {this.state.eggSpeed}/>}
                </div>
                <div className="lowerbg"  >
                <button onClick= {() => this.move(-this.state.basketSpeed)} className="move">Left</button>
                <button onClick= {() =>this.move(this.state.basketSpeed)} className="move">Right</button>
                <Moves left={this.state.basketLeft} speed={this.state.basketSpeed} eggl= {this.state.eggLeft} eggsp={this.state.eggSpeed}/>
                </div>
            </div>
        )
    }
}
export default Background