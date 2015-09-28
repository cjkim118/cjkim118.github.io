

var arr = []; 
var temp_arr = []; 
var before_arr = [];
var play_auto_or_not = 0;
var result=0;


function init(){
	with(window.document)
	{
		open();
		writeln('<table border=1 cellpadding=0 cellspacing=1>');
		for(var i=0; i<400;i++){
			
			var ran = Math.random();
			if( ran<0.5)
				arr[i] = 0;
			else if(ran>=0.5)
				arr[i] = 1;
			
			writeln('  <td width=24 height=24>');
			writeln('      <a href=JavaScript:void(0); onclick=Alive_Or_Dead();>');
			if(arr[i] == 0)			writeln('       <img src=deadcell.png border=0 width=20 height=20 id=img',i,'></a>');
			else if(arr[i] == 1)	writeln('       <img src=cell.png border=0 width=20 height=20 id=img',i,'></a>');
			writeln('  </td>');
			if((i+1)%20==0)		writeln('<tr>');	
		}
		writeln('</table>');	
		close();
	}
	
}

function Cal_Alive_Cells(){
	result = 0;
	for(var i=0; i<400; i++){
		result = result + arr[i];
	}
}
			
function Alive_Or_Dead(){

	document.getElementById('res').value = '';
	for(var i=0; i<400;i++){
		before_arr[i] = arr[i];
		
		if(i%20 == 0){
		if(arr[i+1]+arr[i+20]+arr[i+(20+1)]+arr[i-20]+arr[i-(20-1)] == 3)	
			temp_arr[i] = 1;
		else if(arr[i+1]+arr[i+20]+arr[i+(20+1)]+arr[i-20]+arr[i-(20-1)] == 2)
			temp_arr[i] = arr[i];
		else		
			temp_arr[i] = 0;
		}
	
		
		else if((i+1)%20 == 0){
			if(arr[i-1]+arr[i+(20-1)]+arr[i+20]+arr[i-(20+1)]+arr[i-20] == 3)
				temp_arr[i] = 1;
			else if(arr[i-1]+arr[i+(20-1)]+arr[i+20]+arr[i-(20+1)]+arr[i-20] == 2)
				temp_arr[i] = arr[i];
			else
				temp_arr[i] = 0;
		}	
	

		else{
			if(arr[i-1]+arr[i+1]+arr[i+(20-1)]+arr[i+20]+arr[i+(20+1)]+arr[i-(20-1)]+arr[i-20]+arr[i-(20+1)] == 3)
				temp_arr[i] = 1;
			else if(arr[i-1]+arr[i+1]+arr[i+(20-1)]+arr[i+20]+arr[i+(20+1)]+arr[i-(20-1)]+arr[i-20]+arr[i-(20+1)] == 2)
				temp_arr[i] = arr[i];
			else		
				temp_arr[i] = 0;
		
		}
	}
	
	for(var i=0; i<400;i++){
		arr[i] = temp_arr[i];
		var img = document.getElementById("img"+i);
		if(arr[i] == 0)	 img.src = "deadcell.png";
		else if(arr[i] == 1)	 img.src = "cell.png";
	}
	
	Cal_Alive_Cells();
	ShowAliveNumbers();

}
	function Play_Auto(){
	play_auto_or_not = setInterval(Alive_Or_Dead,2000);	
    }

   function Play_Manual(){
	clearInterval(play_auto_or_not);	
   }

   function Initialization(){
	Paint_Grid();
   }


   function Paint_Grid(){
	for(var j=0; j<400;j++){
		var ran = Math.random();
		before_arr[j] = arr[j];
		if( ran<0.5)
			arr[j] = 0;		
		else if(ran>=0.5)
			arr[j] = 1;
		var img = document.getElementById("img"+j);
		if(arr[j] == 0)	 img.src = "deadcell.png";
		else if(arr[j] == 1)	 img.src = "cell.png";
	}
  }

function Go_Rewind(){
	for(var i=0;i<400;i++){
		var img = document.getElementById("img"+i);
		if(before_arr[i] == 0)	 img.src = "deadcell.png";
		else if(before_arr[i] == 1)	 img.src = "cell.png";
		arr[i] = before_arr[i];
	}
}


function ShowAliveNumbers(){
	document.getElementById('res').value = result;
}

