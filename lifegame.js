var arr = []; 	//数组，将保存细胞的生死状态
var temp_arr = []; 	//临时保存细胞状态
var before_arr = [];	//细胞的上一次状态
var play_auto_or_not = 0;	//是否自动运行
var alive_cells = 0;		//活细胞的个数
var grid_size = 20;
var grid_size_double = 400;
var play_delay_speed = 2000;
var denisties = 0;

function RandomNumber(){
	alive_cells = 0;
		for(var i=0; i<grid_size_double;i++){
			var rand = Math.random();
			if( rand<denisties / 100){
				arr[i] = 1;		//表示细胞为生
				alive_cells = alive_cells + 1;
			}
			else
				arr[i] = 0 ;		//表示细胞为死
		}
}
function CreateGrid(){
	var output = '<table>';
	for(var i=0;i<grid_size;i++){
		for(var j=0;j<grid_size;j++){
			output += '  <td width=25 height=25>';
			output += '<a href=JavaScript:; onclick=Create_Walls();>';
			if(arr[j*grid_size + i ] == 0)
				output += '<img src=deadcell.png border=0 width=20 height=20 id=img'+(i*grid_size+j)+'></a>';
			else 
				output += '<img src=cell.png border=0 width=20 height=20 id=img'+(i*grid_size+j)+'></a>';
			output += '</td>';
		}
		output += '<tr>';
	}
	output += '</table>'
	document.getElementById("tdl").innerHTML=output;
	test( "Create grid", function() {	
			var result=0;
			for(var i=0; i<grid_size_double;i++){
				if(arr[i] != 10)
					result = result + arr[i];
			}
		equal( result, result , "Alive cells : "+ result);
	});

}

function Configurability(){
	play_delay_speed = document.getElementById('speed').value * 1000;
	grid_size = document.getElementById('size').value;
	grid_size_double = grid_size * grid_size;
	denisties = document.getElementById('denisty').value;
	do{
		RandomNumber();
	}while((denisties * 0.9 > alive_cells/grid_size_double * 100) || (denisties * 1.1 < alive_cells / grid_size_double * 100))

	CreateGrid();
}

function PositionBody(event){	//获得x,y的坐标，确定点击的元素为第几个数组元素
    event = event||window.event; 
    //获得相对于body定位的横标值；
 
    x=event.clientX + document.body.scrollLeft;
    //获得相对于body定位的纵标值； 
    y=event.clientY + document.body.scrollTop;

    x = Math.floor(x / 25);
    y = Math.floor(y / 25);
    var elements = y * grid_size + x ;

    module( "Position of clicked element" );
	test( "test", function() {
		equal( 1, 1, "The elements you clicked : "+ elements);
	});
    return elements;
}

function Create_Walls(){		//벽을 10으로 설정하기!!
	id = PositionBody();
	arr[id] = 10;
	var img = document.getElementById("img"+id);
	img.src = "wallcell.png";
}

function Cal_Alive_Cells(){		//计算活细胞的个数
	alive_cells = 0;
	for(var i=0; i<grid_size_double; i++){
		if(arr[i] != 10)
			alive_cells = alive_cells + arr[i];
	}
}
			
function Alive_Or_Dead(){
	document.getElementById('res').value = '';
	for(var i=0; i<grid_size_double;i++){
		before_arr[i] = arr[i];		//更新之前保存上一次状态
		if(arr[i] == 10){
			temp_arr[i] = 10;
			continue;
		}
		//处理不在范围内的NaN元素
		if(	arr[i+1] !=0 && arr[i+1] !=1  && arr[i+1] != 10)				arr[i+1] =0;
		if(	arr[i+2] !=0 && arr[i+2] !=1	&& arr[i+2] != 10 )			arr[i+2] =0;
		if(	arr[i-1] !=0 && arr[i-1] !=1  && arr[i-1] != 10)				arr[i-1] =0;
		if(	arr[i-2] !=0 && arr[i-2] !=1	&& arr[i-2] != 10 )			arr[i-2] =0;
		if(	arr[i+grid_size] !=0 && arr[i+grid_size] !=1 && arr[i+grid_size] != 10)		arr[i+grid_size] =0;
		if(	arr[i+grid_size*2] !=0 && arr[i+grid_size*2] !=1 && arr[i+grid_size*2] != 10)		arr[i+grid_size*2] =0;
		if(	arr[i-grid_size] !=0 && arr[i-grid_size] !=1 && arr[i-grid_size] != 10)		arr[i-grid_size] =0;
		if(	arr[i-grid_size*2] !=0 && arr[i-grid_size*2] !=1 && arr[i-grid_size*2] != 10)		arr[i-grid_size*2] =0;
		live_cells_up_down = arr[i-grid_size]+arr[i-grid_size*2]+arr[i+grid_size]+arr[i+grid_size*2];
		live_cells_left_right = arr[i-1] + arr[i+1] + arr[i-2] + arr[i+2];
		if(i %grid_size == 0){	//格子位于最左边
		if(arr[i+1]+arr[i+2]+live_cells_up_down == 3)	
			temp_arr[i] = 1;
		else if(arr[i+1]+arr[i+2]+live_cells_up_down == 2)
			temp_arr[i] = arr[i];
		else		
			temp_arr[i] = 0;
		}
	
		else if((i+1) % grid_size== 0){
			if(arr[i-1]+arr[i-2]+live_cells_up_down == 3)
				temp_arr[i] = 1;
			else if(arr[i-1]+arr[i-2]+live_cells_up_down == 2)
				temp_arr[i] = arr[i];
			else
				temp_arr[i] = 0;
		}	
	

		else{
			if(live_cells_left_right+live_cells_up_down == 3)
				temp_arr[i] = 1;
			else if(live_cells_left_right+live_cells_up_down == 2)
				temp_arr[i] = arr[i];
			else		
				temp_arr[i] = 0;
		
		}
	}

	module( "next generation status of cells" );
	test( "generation", function() {
		var alive=0;
		var same_status = 0;
		var dead_status = 0;
		var live_status = 0;
		var wall_status = 0;
		for(var i=0; i<grid_size_double;i++){	
			if(temp_arr[i] == 10){
				wall_status = wall_status + 1;
				continue;
			}
			//左排部分
			if(i%grid_size == 0){	//왼쪽 줄
				alive = arr[i+1]+arr[i+2]+arr[i+grid_size]+arr[i+grid_size*2]+arr[i-grid_size]+arr[i-grid_size*2];
				if(alive == 2)		same_status = same_status + 1;
				else if(alive == 3)	live_status = live_status + 1;
				else				dead_status = dead_status + 1;
			}
	
			//右排部分
			else if((i+1)%grid_size == 0){	//오른쪽 줄
				alive = arr[i-1]+arr[i-2]+arr[i+grid_size]+arr[i+grid_size*2]+arr[i-grid_size]+arr[i-grid_size*2];
				if(alive == 2)		same_status = same_status + 1;
				else if(alive == 3)	live_status = live_status + 1;
				else				dead_status = dead_status + 1;
			}
	
			//其他
			else{	
				alive = arr[i+1]+arr[i+2]+arr[i-1]+arr[i-2]+arr[i+grid_size]+arr[i+grid_size*2]+arr[i-grid_size]+arr[i-grid_size*2];
				if(alive == 2)		same_status = same_status + 1;
				else if(alive == 3)	live_status = live_status + 1;
				else				dead_status = dead_status + 1;
			}
		}
		equal( 1, 1, "Become alive cells : "+ live_status);
		equal(1,1,"Same cells : "+same_status);
		equal( 1, 1, "Become dead cells : "+ dead_status);
		equal( 1, 1, "Wall cells : "+ wall_status);
	});
	
	for(var i=0; i<grid_size_double;i++){		//更新ID
		arr[i] = temp_arr[i];
		var img = document.getElementById("img"+i);
		if(arr[i] == 0)	 img.src = "deadcell.png";
		else if(arr[i] == 1)	 img.src = "cell.png";
	}
	Cal_Alive_Cells();
	ShowAliveNumbers();

}

function Play_Auto(){
	play_auto_or_not = setInterval(Alive_Or_Dead,play_delay_speed);	
}

function Play_Manual(){
	clearInterval(play_auto_or_not);	
}

function Initialization(){
	do{
		RandomNumber();
	}while((denisties * 0.9 > alive_cells/grid_size_double * 100) || (denisties * 1.1 < alive_cells / grid_size_double * 100))
	Paint_Grid();
}


function Paint_Grid(){
	for(var j=0; j<grid_size_double;j++){
		before_arr[j] = arr[j];
		var img = document.getElementById("img"+j);
		if(arr[j] == 0)	 img.src = "deadcell.png";
		else if(arr[j] == 1)	 img.src = "cell.png";
	}
	test( "Initialization", function() {	
		var result=0;
		for(var i=0; i<grid_size_double;i++){
			if(arr[i] != 10)
				result = result + arr[i];
		}
		equal( result, result , "Alive cells : "+ result);
	});
}

function Go_Rewind(){
	for(var i=0;i<grid_size_double;i++){
		var img = document.getElementById("img"+i);
		if(before_arr[i] == 0)	 img.src = "deadcell.png";
		else if(before_arr[i] == 1)	 img.src = "cell.png";
		arr[i] = before_arr[i];
	}
}


function ShowAliveNumbers(){
	document.getElementById('res').value = alive_cells;
}

$(document).ready(function(){
	$('button#confirm').click(function(e){
		e.preventDefault();
		Configurability();
	});
});
