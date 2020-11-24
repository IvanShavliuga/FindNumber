<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
<div id="app">
<div v-for="(y,ky) in rows" :key="ky">
<div v-for="(x,kx) in columns"  :key="kx">
  <div :class="drawclass(x-1,y-1)"
    @click="checkball(x-1,y-1)"
    :data-check="printnum(x-1,y-1)"
    >
      {{printnum(x-1,y-1)}}</div>
</div>
</div>
  <div class="time">
    <div class="current" :data-curr="curr" :style="'width:'+(time/60)*100+'%'">{{time}}</div>
 </div>

  <div style="color: white">
  Count: {{count}} Score: {{score}} Find of: {{find}}
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      rows: [1, 2, 3, 4, 5, 6, 7, 8],
      columns: [1, 2, 3, 4, 5, 6, 7, 8],
      board: [],
      find: 10,
      count: 0,
      score: 0,
      winner: false,
      time: 60,
      curr: 0
    }
  },
  methods: {
    draw (x, y, r) {
      return {
        animationDelay: (x < 5 && y < 5) ? ('0.' + r + '' + x + '' + y + 's') : ('1.' + x + '' + r + '' + y + 's'),
        background: '#' + x + '5' + r + '2' + y + '2'
      }
    },
    drawclass (x, y) {
      const cell = this.printnum(x, y)
      if (cell < 20) { return 'ball ball_1' } else if (cell >= 20 && cell <= 36) { return 'ball ball_2' } else if (cell >= 37 && cell <= 53) { return 'ball ball_3' } else if (cell >= 54 && cell <= 70) { return 'ball ball_4' } else if (cell >= 71 && cell <= 87) { return 'ball ball_5' } else if (cell >= 88 && cell < 100) { return 'ball ball_6' } else { return 'ball ball_check' }
    },
    nextstep () {
      for (let i = 0; i < 64; i++) {
        const b = this.board[i]
        const ni = Math.floor(Math.random() * 64)
        this.board[i] = this.board[ni]
        this.board[ni] = b
      }
      let x = Math.floor(Math.random() * 8)
      let y = Math.floor(Math.random() * 8)
      while (this.board[x + y * 8] === 'OK') {
        x = Math.floor(Math.random() * 8)
        y = Math.floor(Math.random() * 8)
      }
      this.find = this.board[x + y * 8]
    },
    generatenumbers () {
      for (let y = 0; y < this.rows.length; y++) {
        for (let x = 0; x < this.columns.length; x++) {
          const rnd = Math.random() * 90 + 10
          this.board.push(Math.floor(rnd))
        }
      }
      this.nextstep()
    },
    printnum (x, y) {
      return this.board[x + y * 8]
    },
    checkball (x, y) {
      const check = this.board[x + y * 8]
      if (check === this.find) {
        this.count++
        this.score += 5
        this.board[x + y * 8] = 'OK'
        this.nextstep()
      } else {
        this.score -= 5
      }
      if (this.count === 64) {
        this.winner = true
      }
    },
    countertime () {
      if (this.time > 0) { this.time-- }
      if (this.time === 59) {
        this.curr = 'start'
      }
      this.curr = Math.floor((60 - this.time) / 10 + 1) + '0'
      setTimeout(this.countertime, 1000)
    }
  },
  created () {
    this.generatenumbers()
    this.nextstep()
    this.countertime()
  }
}
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
body {
  background-color:black;
}
#app {
    background-color:black;
}
#app > div {
    display: flex;
}

.ball::selection {
    background:transparent;
    cursor: pointer;
}

.ball {
border-radius: 45%;
width: 35px;
height: 35px;
color: yellow;
text-align: center;
line-height: 35px;
margin: 2px;
animation: 1.3s opacityeff infinite;
}

.ball_1 {
background-color: #df3434;
animation-delay:1.1s;
}

.ball_2 {
background-color: #34df34;
animation-delay:1s;
}

.ball_3 {
background-color: #3434df;
animation-delay:0.8s;
}

.ball_4 {
background-color: #34dfdf;
animation-delay:0.7s;
}

.ball_5 {
background-color: #df34df;
animation-delay:0.6s;
}

.ball_6 {
background-color: #dfdfdf;
animation-delay:0.5s;
}

.ball[data-check='OK'], .ball_check {
border: 1px solid white;
color: white;
background-color: #222;
}
  .time {
    background-color:rgba(99,99,99,0.5);
    width:310px;
    height: 30px;
    padding: 0;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .current {
    display: block;
    color: #fff;
    padding: 5px;
  }
  .current[data-curr="0"], .current[data-curr="70"]{
    display: none;
  }
   .current[data-curr="start"] {
    font-weight: bold;
  }
  .current[data-curr="60"] {

    background-color: rgba(200,12,12,0.7);
  }
   .current[data-curr="50"] {

    background-color: rgba(128,12,12,0.7);
  }
   .current[data-curr="40"] {
    background-color: rgba(100,0,12,0.7);
  }
   .current[data-curr="30"] {
     width:56%;
    background-color: rgba(200,200,12,0.7);
  }
   .current[data-curr="20"] {
    background-color: rgba(12,100,12,0.7);
  }
   .current[data-curr="10"] {
    background-color: rgba(12,200,12,0.7);
  }

@keyframes opacityeff {
0% {
opacity:0.1;
transform:rotateZ(45deg);
color: white;
}
25% {
opacity:0.4;
transform:rotateZ(5deg);
color: black;
}
50% {
opacity: 1;
transform:rotateZ(0deg);
color: yellow;
}
75% {
opacity: 0.8;
transform:rotateZ(135deg);
color: black;
}
100% {
opacity: 1;
transform:rotateZ(25deg);
color: white;
  }
}
</style>
