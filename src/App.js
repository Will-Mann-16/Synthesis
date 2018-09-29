import React, {Component} from 'react'
import styled from 'styled-components';
import {Trail, Spring, animated} from 'react-spring';

const COLOUR = '#41BDCA';
const BACKGROUND_COLOUR = '#EEAD7D';
const TEXT_COLOUR = '#38747C';
const LIGHT_COLOUR = '#A1C7D1';
const ORANGE_COLOUR = '#F5904C';
const YELLOW_COLOUR = '#F8DE79';

const BackgroundWrapper = styled.div`
    background-color: ${BACKGROUND_COLOUR};
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-template-areas: 
        "blue blue blue gray gray blue orange blue blue"
        "blue blue yellow blue blue blue blue navy navy"
        "navy navy navy blue blue yellow blue blue blue"
        "blue blue gray blue blue yellow blue blue blue"
        "blue blue blue blue blue blue blue blue orange orange"
        "blue blue orange blue gray gray blue blue blue"
        "blue blue blue navy blue blue blue blue blue blue"
        "blue title title title title title title title blue"
        "blue title title title title title title title blue"
        "blue title title title title title title title blue"
        "blue blue yellow blue blue blue blue orange blue blue"
  &::before{
  content: '';
  width: 0;
  position: fixed;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
  }
  &>*:first-child{
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  z-index: 0;
  overflow:hidden;
`;
const Block = styled(animated.div)`
  background-color: ${({colour}) => colour};
  grid-area: ${({area}) => area};
`;
const Title = styled.div`
  text-align: center;
  font-family: 'Linux-Libertine';
  letter-spacing: 2rem;
  font-size: 5rem;
  color: ${TEXT_COLOUR};
`;

class App extends Component {
    state = {
        width: 0,
        height: 0
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    render() {
        var {width, height} = this.state;
        var columns = Math.floor(width / 120) - 1;
        var gap = (width % 120) / columns + Math.floor(120 / columns);
        var blocks = [];
        var centerBlockStart = columns * 2 + 1 + (columns % 2 === 0 ? (columns > 8 ? (columns - 8) / 2 : 0) : (columns > 9 ? (columns - 9) / 2 : 0));
        var centerBlockWidth = columns % 2 === 0 ? (columns > 8 ? 8 : columns) : (columns > 9 ? 9 : columns)
        var limit = Math.ceil(height / 150) * columns;
        for (var i = 0; i < limit; i++) {
            var isOnEnd = i + 1 % columns === 0;
            var colour = COLOUR;
            if (i % 6 === 0) {
                colour = LIGHT_COLOUR;
            }
            else if (i % 5 === 2) {
                colour = TEXT_COLOUR;
            }
            else if (i % 13 === 3) {
                colour = YELLOW_COLOUR;
            }
            else if (i % 8 === 2) {
                colour = ORANGE_COLOUR;
            }
            if(i + 1 === centerBlockStart){
                blocks.push({colour: COLOUR, width: centerBlockWidth, height: 4, children: <Title>SYNTHESIS</Title>});
            }
            else {
                blocks.push({
                    colour,
                    width: 1,
                    height: 1,
                    children: null
                });
            }
        }
        return (
            <div style={{zIndex: 0, position: 'relative', overflow: 'hidden'}}>
                <BackgroundWrapper columns={columns} width={150} height={150} gap={gap}>
                    <Trail native keys={blocks.map((block, key) => key)} from={{opacity: 0}} to={{opacity: 1}}>{blocks.map(({colour, width, height, children}) => styles => <Block style={{opacity: styles.opacity.interpolate((opacity => opacity))}} colour={colour} width={width} height={height}>{children}</Block>)}</Trail>
                </BackgroundWrapper>
            </div>
        );
    }
}

export default App;
