/*
archive
https://codepen.io/ivanshavliuga/pen/ReBbyr
*/
var  Score=0, TimeStr=0,best=0, play=false ;
function RandomString()
{
	RandStr=Math.random() * (10000 - 1000) + 1000;

	return RandStr;
}
function TimeGame()
{

	if(TimeStr>=100){
		if(Score>=best) best=Score;
    document.board.Fs.value=best;
    play=false;
	}else{
		TimeStr++;
		document.board.Ts.value=TimeStr.toString();
		setTimeout("TimeGame();",1000);
	}
}
function RandomBoard()
{
	var i, j, k, s;


	for(i=1; i<=5; i++)
	{
		for(j=1; j<=5; j++){
			s='R'+i.toString()+j.toString();
			k=Math.random() * (10000 - 1000) + 1000;
			k=Math.trunc(k);
			document.board.elements[s].value=k.toString();
		}
	}
	i=Math.random()*5;
	j=Math.random()*5;
	i=Math.trunc(i);
	j=Math.trunc(j);
	if(i==0) i=1;
	if(j==0) j=1;
	s='R'+i.toString()+j.toString();
	document.board.FV.value=document.board.elements[s].value;

	return true;
}
function Start()
{
	var a=document.cookie.split(':');
	TimeStr=0;
	Score=0;

		document.board.Fs.value=best;
		document.board.Sc.value="0";
  play=true;
	RandomBoard();
	TimeGame();
}
function Test(x, y)
{
  if(play){
	var s='R'+x.toString()+y.toString();
	var f=document.board.elements[s].value;

	if(f==document.board.FV.value){
		Score++;
		RandomBoard();
	}
	document.board.Sc.value=Score.toString();
  }
}
