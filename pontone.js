/*PonTONE v1.5.4*/
function debi(id){
	return document.getElementById(id);
}

/*device*/
var user_device=window.navigator.userAgent.toLowerCase();
console.log(user_device);

/*choice pattern*/
var b_pattern_array=[];
function buttons_pattern(){
	let bg_num=0;
	for(let i=0;i<24;i++){
		if((i+1)%4==0){
			if((i+1)/4<=4){
				let buttons_line="";
				for(let j=0;j<(i+1);j++){
					buttons_line+='<div id="b-'+j+'" class="choice_button">';
						buttons_line+='<span class="choice_b_num">'+(j+1)+'</span>';
					buttons_line+='</div>';
				}
				let bk_ground_line='<div id="bg-'+bg_num+'" class="choice_bk_ground">';
					bk_ground_line+=buttons_line;
				bk_ground_line+='</div>';
				let check_line='<div id="cd-'+bg_num+'" class="check_div" onclick="choice_confirm('+bg_num+')">';
                check_line+=bk_ground_line;
				check_line+='</div>'
				b_pattern_array.push((i+1)+"\t"+"4\t"+check_line);
				bg_num++;
			}
		}
		if((i+1)%6==0){
			if((i+1)/6<=4){
				let buttons_line="";
				for(let j=0;j<(i+1);j++){
					buttons_line+='<div id="b'+j+'-'+bg_num+'" class="choice_button">';
						buttons_line+='<span class="choice_b_num">'+(j+1)+'</span>';
					buttons_line+='</div>';
				}
				let bk_ground_line='<div id="bg-'+bg_num+'" class="choice_bk_ground">';
					bk_ground_line+=buttons_line;
				bk_ground_line+='</div>';
				let check_line='<div id="cd-'+bg_num+'" class="check_div" onclick="choice_confirm('+bg_num+')">';
					check_line+=bk_ground_line;
				check_line+='</div>'
				b_pattern_array.push((i+1)+"\t"+"6\t"+check_line);
				bg_num++;
			}
		}
	}
	debi("choice_lay").style.width=(((((6*6))+(28*6))+30)*2+(24*2))+"px";
	debi("choice_lay").style.height=(((6*(24/6)+12)+(28*(24/6)))*2+((6*(12/6)+12)+(28*(12/6)))+((6*(6/6)+12)+(28*(6/6)))+(36*4))+"px";
    debi("choice_lay").innerHTML='<div style="color:hsla(0,0%,45%,1.00)">Click Buttons Pattern</div>';
    debi("choice_lay").innerHTML+='<div id="choice_row" class="choice_row_div"></div>';
	for(let i=0;i<b_pattern_array.length;i++){
		let b_num=Number(b_pattern_array[i].split("\t")[0]);
		let line_num=Number(b_pattern_array[i].split("\t")[1]);
		debi("choice_row").innerHTML+=b_pattern_array[i].split("\t")[2];
		debi("cd-"+i).style.width=((((6*6))+(28*6))+30)+"px";
		debi("cd-"+i).style.height=((6*(b_num/line_num)+12)+(28*(b_num/line_num)))+"px";
        debi("bg-"+i).style.width=((6*line_num)+(28*line_num))+"px";
		debi("bg-"+i).style.height=((6*(b_num/line_num))+(28*(b_num/line_num)))+"px"; 
	}
}

function choice_confirm(num){
    debi("cd-"+num).style.backgroundColor="hsla(0,0%,75%,1.00)";
 	let confirm_line='<div class="confirm_lay_div">';
		confirm_line+='<span style="color:hsla(0,0%,45%,1.00)">';
			confirm_line+="Your Choice";
		confirm_line+='</span>';
		let c_pattern=b_pattern_array[num].split("\t")[2].replace(/\"bg-/,"\"bgc-");
		c_pattern=c_pattern.replace(/\"cd-/,"\"cdc-");
		confirm_line+=c_pattern;
		confirm_line+='<span>';
			confirm_line+='<input type="button" id="b_again" class="size_13" value="Again" onClick="choice_again('+num+')">';
			confirm_line+='<span>　　　</span>';
			confirm_line+='<input type="button" id="b_set" class="size_13" value="Set" onClick="choise_set('+Number(b_pattern_array[num].split("\t")[0])+','+Number(b_pattern_array[num].split("\t")[1])+')">';
		confirm_line+='</span>';
	confirm_line+='</div>';
	debi("confirm_lay").innerHTML=confirm_line;
	debi("confirm_lay_background").style.display='flex';
	debi("confirm_lay").style.display='block';
	let b_num=Number(b_pattern_array[num].split("\t")[0]);
	let line_num=Number(b_pattern_array[num].split("\t")[1]);
    debi("cdc-"+num).onclick="null";    
	debi("cdc-"+num).style.width=((((6*6))+(28*6))+30)+"px";
	debi("cdc-"+num).style.height=((6*(b_num/line_num)+12)+(28*(b_num/line_num)))+"px";
	debi("bgc-"+num).style.width=((6*line_num)+(28*line_num))+"px";
	debi("bgc-"+num).style.height=((6*(b_num/line_num))+(28*(b_num/line_num)))+"px";
    debi("cd-"+num).style.backgroundColor="";
}

function choice_again(num){
	debi("confirm_lay").innerHTML="";
	debi("confirm_lay").style.display='none';
	debi("confirm_lay_background").style.display='none';
}

function choise_set(num1,num2){
	debi("confirm_lay").innerHTML="";
	debi("confirm_lay").style.display='none';
	debi("confirm_lay_background").style.display='none';
	debi("choice_lay").style.display="none";
	make_buttons(num1,num2);
}

/*buttons object default*/
function myButton(){//button object
	this.color=180;
    this.on=0;
    this.fading=0;
	this.type=""
	this.data=""
    this.url="";
    this.name;
    this.timer;
	this.visualizer;
    this.volume=0.75;//%
	this.gainNode;
	this.cue=1;
	this.loop=false;
    this.begining=0;
    this.content="";
    this.order;
    this.start=0;
    this.all;
    this.lines;
}

/*set-up buttons*/
var button_array=[];
var order_array=[];
var dummy_button="";
var colorb_c=0;
var sub_win;
var window_options = "menubar=no,location=yes,resizable=yes,scrollbars=no,status=no";
function make_buttons(num1,num2){//num1=all,num2=lines
	debi("tytle_bar").style.display="flex";
	debi("master_qty").innerHTML=debi("master").value=m_v=7.5;
	debi("fader").value=2;
	debi("fader_qty").innerHTML="2.0";
    for(let i=0;i<num1;i++){
		button_array.push(new myButton());
        button_array[i].order=i;
		let step=360/num1;
        button_array[i].color=180-step*i;
		let buttons_line='<div id="b-'+i+'" class="button">';
				buttons_line+='<div id="bvd-'+i+'" class="bv_div">';//button vidualize div 0
                    buttons_line+='<div id="bvd-'+i+'_L" class="bv_div_L">';//button vidualize div L
                        for(let j=0;j<FFT_SIZE/2;j++){
					        buttons_line+='<div id="box-'+i+'_L-'+j+'" class="box"></div>';
				        }
                    buttons_line+='</div>';
                    buttons_line+='<div id="bvd-'+i+'_R" class="bv_div_R">';//button vidualize div R
                        for(let j=0;j<FFT_SIZE/2;j++){
					        buttons_line+='<div id="box-'+i+'_R-'+j+'" class="box"></div>';
				        }
                    buttons_line+='</div>';
                buttons_line+='</div>';
                buttons_line+='<div id="movie-'+i+'" class="mv_div"></div>';//movie div 1
                buttons_line+='<div id="bnd-'+i+'" class="bn_div">';//button number div 2
                    buttons_line+='<span id="bnn-'+i+'" class="b_number_off">';
                    if(i<9){
                        buttons_line+='0'+(i+1);
                    }
                    else{
                        buttons_line+=(i+1);
                    }
                	buttons_line+='</span>';
            	buttons_line+='</div>';
				buttons_line+='<div id="btd-'+i+'" class="bt_div">';//button timer div 3
                	buttons_line+='<span id="bti-'+i+'" class="b_time_ing"></span>';
                	buttons_line+='<span id="bt-'+i+'" class="b_time"></span>';
            	buttons_line+='</div>';
            	buttons_line+='<div id="bdd-'+i+'" class="bd_div">';//div 4
                	buttons_line+='<span id="bdn-'+i+'" class="d_name"></span>';
            	buttons_line+='</div>';        
            	buttons_line+='<div id="bld-'+i+'" class="b_lay"></div>';//div 5

		buttons_line+='</div>';
		debi("button_background").innerHTML+=buttons_line;
		debi("bnn-"+i).style.color="hsla("+button_array[i].color+",0%,100%,1.00)";//white
		debi("bti-"+i).style.color="hsla("+button_array[i].color+",0%,100%,1.00)";//white
		debi("bti-"+i).style.fontWeight="bold";
		debi("bt-"+i).style.color="hsla("+button_array[i].color+",0%,100%,1.00)";//white
		debi("bt-"+i).style.fontSize="9pt";//white
		debi("bdn-"+i).style.color="hsla("+button_array[i].color+",0%,100%,1.00)";//white
		debi("bdn-"+i).style.fontWeight="bold";
        button_array[i].content=debi("b-"+i).innerHTML;
        debi("b-"+i).style.order=i;
        order_array.push(i);
    }
    let dummy_line='<div id="dummy" class="button"><div id="bnd-dummy" class="bn_div"><span id="bnn-dummy" class="b_number_off"></span></div></div>';
    debi("button_background").innerHTML+=dummy_line;
    debi("bnn-dummy").style.color="hsla(0,0%,100%,1.00)";//white
    debi("dummy").style.display="none";
    debi("button_background").style.width=(num2*100+num2*20)+"px";
    debi("button_background").style.height=((num1/num2)*100+(num1/num2)*20)+"px";
	//sub_win=open("movie.html","Display Window",window_options);
}

/*assign*/
function assign_data(num){//new index_number
    debi("bdn-"+num).innerHTML=button_array[num].name;
    debi("movie-"+num).innerHTML='<video id="mov-'+num+'" height="0px" width="0px"></video>';
    debi("mov-"+num).src=button_array[num].url;
    debi("mov-"+num).addEventListener("loadedmetadata", ()=>{
        debi("bt-"+num).innerHTML=data_duration(debi("mov-"+num).duration-button_array[num].start); 
        debi("mov-"+num).currentTime=button_array[num].start;
        for (let i = 0; i < FFT_SIZE/2; i++) {
            debi("box-"+num+"_L-"+i).style.width = "0px";
            debi("box-"+num+"_R-"+i).style.width = "0px";
        }
        prepare_button(num);
    });
}

function prepare_button(num){
    let hue_num=button_array[num].color;
    debi("b-"+num).style.backgroundColor="hsla("+hue_num+",70%,50%,0.60)";
    debi("b-"+num).style.borderTop="0px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderLeft="0px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderBottom="4px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderRight="4px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("bnn-"+num).className="b_number_on";
    debi("bnn-"+num).style.color="hsla("+hue_num+",90%,35%,0.80)";
    debi("bti-"+num).innerHTML=(debi("mov-"+num).currentTime.toFixed(3)-button_array[num].start.toFixed(3)).toFixed(1)+"/";
        
    debi("btd-"+num).style.backgroundColor="hsla("+hue_num+",75%,45%,0.40)";
    debi("bdn-"+num).style.color="hsla(0,0%,100%,1.00)";
    debi("bld-"+num).style.backgroundColor="hsla(0,0%,100%,0.00)";
    debi("bld-"+num).innerHTML="";
    debi("mov-"+num).volume=button_array[num].volume*m_v/10
    button_array[num].content=debi("b-"+num).innerHTML;
}

var x=0;
var y=0;
var drag_ele;
var drag_move=0;

/*touch pad*/
document.addEventListener("touchstart", (e)=>{//touch //fader_div
    if(e.target.parentNode.id=="tool_bar" || e.target.parentNode.parentNode.id=="tool_bar"){//tool_bar draggable
        if(e.target.id=="close_x" || e.target.id=="master" || e.target.id=="f_b" || e.target.id=="fader"){
        }
        else{
            //e.stopPropagation();
            //e.preventDefault();
            //drag_move=1;
            drag_ele = debi("tool_bar");
            debi("tool_bar").draggable=true;
            x = e.pageX-debi("tool_bar").offsetLeft;
            y = e.pageY-debi("tool_bar").offsetTop;
            //stopImmediatePropagation();
        }
    }
    else if(e.target.id.indexOf("bld-")>=0 && e.target.parentNode.id.indexOf("b-")>=0){
        //e.stopPropagation();
        //e.preventDefault();
        //drag_move=1;
        let num=Number(e.target.id.split("-")[1]);
        if(debi("mov-"+num)){
            if(debi("mov-"+num).paused){
                drag_ele = debi("b-"+num);
                debi("b-"+num).draggable=true;
                //console.log('debi("b-'+num+'").draggable='+debi("b-"+num).draggable);
                x = e.pageX-debi("b-"+num).offsetLeft;
                y = e.pageY-debi("b-"+num).offsetTop;
            }
        }
    }
    else{
    }
    //console.log("drag_ele="+drag_ele);
});//,{passive:false};

document.addEventListener('touchmove', function(e) {
    if(drag_ele.id=="tool_bar" && drag_ele.draggable==true){//tool_bar draggable
        drag_move=1;
        console.log("touchmove x="+x);
        e.preventDefault();
        e.stopPropagation();
        debi("tool_bar").style.left=(e.pageX-x)+"px";
        debi("tool_bar").style.top=(e.pageY-y)+"px";
    }
    else if(e.target.id.indexOf("bld-")>=0 && drag_ele.id.indexOf("b-")>=0 && drag_ele.draggable==true){
        drag_move=1;
        //console.log("touchmove dummy in");
        e.preventDefault();
        e.stopPropagation();
        let num=Number(e.target.id.split("-")[1]);
        debi("dummy").style.display="flex";//none -> flex
        debi("dummy").style.order=button_array[num].order;
        debi("dummy").style.visibility="hidden"; //flex & hidden
        debi("b-"+num).style.position="absolute";
        debi("b-"+num).style.zIndex=5;
        debi("b-"+num).style.left=debi("dummy").offsetLeft+"px";
        //debi("x_p").innerHTML=debi("dummy").offsetLeft;
        debi("b-"+num).style.top=debi("dummy").offsetTop+"px";
        //debi("y_p").innerHTML=debi("dummy").offsetTop;
        let b_bgd_w=debi("button_background").style.width.replace(/p/g,"");
        b_bgd_w=Number(b_bgd_w.replace(/x/g,""));
        let b_bgd_h=debi("button_background").style.height.replace(/p/g,"");
        b_bgd_h=Number(b_bgd_h.replace(/x/g,""));

        let l_p=0;//left_place
        let t_p=0;//top_place
        let w_c=b_bgd_w/(100+20);//wide_count
        let h_c=b_bgd_h/(100+20);//high_count
        let left_n=-1;//left_number
        let top_n=-1;//top_number

        for(let i=0;i<w_c;i++){
            if(i==0){
                l_p=110;
            }
            else{
                l_p+=120;
            }
            if(i==w_c-1){
                l_p+=10;
            }
            if(e.pageX - debi("button_background").offsetLeft>=0 && e.pageX-debi("button_background").offsetLeft<=l_p){
                left_n=i;
                break
            }
        }
        for(let i=0;i<h_c;i++){
            if(i==0){
                t_p=110;
            }
            else{
                t_p+=120;
            }
            if(i==h_c-1){
                t_p+=10;
            }
            if(e.pageY - debi("button_background").offsetTop>=0 && e.pageY-debi("button_background").offsetTop<=t_p){
                top_n=i;
                break
            }
        }
        if(left_n>=0 && top_n>=0){
            let w_num=debi("dummy").style.order//with_number
            let t_num=w_c*top_n+left_n;//to_number
            if(t_num>w_num){
                for(let i=0;i<t_num-w_num;i++){
                    debi("b-"+order_array[t_num-i]).style.order=t_num-(i+1);
                    button_array[order_array[t_num-i]].order=t_num-(i+1);
                }
            }
            else if(t_num<w_num){
                for(let i=0;i<w_num-t_num;i++){
                    debi("b-"+order_array[t_num+i]).style.order=t_num+(i+1);
                    button_array[order_array[t_num+i]].order=t_num+(i+1);
                }
            }
            debi("dummy").style.order=t_num;
            debi("b-"+num).style.order=t_num;
            button_array[num].order=t_num;
            order_array.splice(w_num, 1);
            order_array.splice(t_num, 0, num);
            console.log(order_array);
        }
    }
    else{
    }
    //console.log("touchmove drag_ele.id="+drag_ele.id);
    //console.log("drag_move="+drag_move);

},{passive:false});

var touchEndTime;
var tapCount = 0;
var d_top_seq_id;
var touch_array=[];
document.addEventListener('touchend', function(e){
    //console.log("drag_ele="+drag_ele);
    //console.log("drag_ele.id="+drag_ele.id);
    if(drag_move==1){
        e.preventDefault();
        e.stopPropagation();
        if(drag_ele.id=="tool_bar"){
            console.log("touchend tool_bar drag_ele.id="+drag_ele.id);
            console.log("touchmove x="+x);
            debi("tool_bar").style.left=e.pageX-x+"px";
            debi("tool_bar").style.top=e.pageY-y+"px";
            drag_ele=undefined;
            debi("tool_bar").draggable=false;
            drag_move=0;
            console.log("debi(tool_bar).draggable="+debi("tool_bar").draggable+" drag_move="+drag_move);
        }
        else if(drag_ele.id.indexOf("b-")>=0){
            drop_mup(e);
        }
        else{
        }  
    }
    else{
        let touchStartTime = Date.now();
        //console.log("touchStartTime="+touchStartTime);
        if(touch_array.length<=1){
            touch_array.push(e.target.id+"&"+touchStartTime);
        }
        else{
            touch_array.shift();
            touch_array.push(e.target.id+"&"+touchStartTime);
        }
        console.log("touch_array="+touch_array);
        //console.log("e_id="+e_id);
        if(touch_array.length==2){
            if(touch_array[0].split("&")[0].split("-")[1]==touch_array[1].split("&")[0].split("-")[1]){
                if(Number(touch_array[1].split("&")[1]) - Number(touch_array[0].split("&")[1]) < 100){
                    //e.preventDefault();
                    //e.stopPropagation();
                    console.log("ダブルタップ時間差="+(Number(touch_array[1].split("&")[1]) - Number(touch_array[0].split("&")[1])));
                    double_tap(e);
                }
            }
        }
    }
},{passive:false});
/*
document.addEventListener('touchcancel', function(e){
    e.stopPropagation();
    e.preventDefault();
    //stopImmediatePropagation()
    tapCount = 0;
});
*/

/*dataTransfer.files drag & drop*/
document.addEventListener("mousedown", (e)=>{//when no drag , clear at mouseup
    //console.log("mousedown="+drag_move);
    //console.log("mousedown e.target.id="+e.target.id);
    //console.log("mousedown e.target.parentNode.id="+e.target.parentNode.id);
    if(e.target.parentNode.id=="tool_bar" || e.target.parentNode.parentNode.id=="tool_bar"){//tool_bar draggable
        if(e.target.id=="close_x" || e.target.id=="master" || e.target.id=="f_b" || e.target.id=="fader"){
            //console.log(e.target.id);
        }
        else{
            debi("tool_bar").draggable=true;
            console.log("debi(tool_bar).draggable="+debi("tool_bar").draggable);
        }

    }
	else if(e.target.parentNode.id.indexOf("b-")>=0){
        let num=Number(e.target.id.split("-")[1]);
        if(debi("mov-"+num)){
            if(debi("mov-"+num).paused){
                debi("b-"+num).draggable=true;
            }
        }
	}
    else{
    }
});

document.addEventListener("dragstart",(e)=>{// only on browser
    if(e.target.id=="tool_bar"){//when drag , draggable id == target id
        drag_ele = debi("tool_bar");
        drag_move=1;
    }
    else if(e.target.id.indexOf("b-")>=0){
        let num=Number(e.target.id.split("-")[1]);
        if(debi("mov-"+num)){
            if(debi("mov-"+num).paused){
                drag_ele = debi("b-"+num);
                drag_move=1;
                debi("dummy").style.display="flex";// flex <- none
                debi("dummy").style.order=button_array[num].order;
                console.log("dragstart debi(dummy).style.order="+debi("dummy").style.order);
                if(button_array[num].order<9){
                    debi("bnn-dummy").innerHTML='0'+(button_array[num].order+1);
                }
                else{
                    debi("bnn-dummy").innerHTML=button_array[num].order+1;
                }
                debi("b-"+num).style.position="absolute";
                debi("b-"+num).style.zIndex=5;
                debi("b-"+num).style.left=debi("dummy").offsetLeft+"px";
                //debi("x_p").innerHTML=debi("dummy").offsetLeft;
                debi("b-"+num).style.top=debi("dummy").offsetTop+"px";
                //debi("y_p").innerHTML=debi("dummy").offsetTop;
            }
        }
    }
    else{
    }
    console.log("dragstart drag_ele.id="+drag_ele.id);
    console.log("drag_move="+drag_move);
    x = e.pageX-drag_ele.offsetLeft;
    y = e.pageY-drag_ele.offsetTop;
});

document.addEventListener("mouseover",(e)=>{
    // no func
    e.stopPropagation();
    e.preventDefault();
})

document.addEventListener("dragenter",(e)=>{
    // no func
    e.stopPropagation();
    e.preventDefault();
});

document.addEventListener("dragover",(e)=>{
    if(drag_ele!=undefined){
        if(drag_ele.id=="tool_bar"){
            drag_ele.style.visibility="hidden";
        }
        else if(drag_ele.id.indexOf("b-")>=0){
            let num=Number(drag_ele.id.split("-")[1]);
            debi("b-"+num).style.visibility="hidden";
            debi("dummy").style.display="visible";
        }
    }
    e.stopPropagation();
	e.preventDefault();
});

var file_array=[];
document.addEventListener("drop",(e)=>{
    console.log("drop in");
    if(drag_ele!=undefined){    
        if(drag_move=1){
            if(drag_ele.id=="tool_bar"){
                drag_ele.style.top = e.pageY - y + "px";
                drag_ele.style.left = e.pageX - x + "px";
                drag_ele.style.visibility="visible";
                drag_ele=undefined;
                drag_move=0;
                debi("tool_bar").draggable=false;
                console.log("debi(tool_bar).draggable="+debi("tool_bar").draggable);
                console.log("drag_move="+drag_move);
            }
            else if(drag_ele.id.indexOf("b-")>=0){
                drop_mup(e);
            }
        }
    }
    else{
        if(e.target.id.indexOf("bld-")>=0){
            file_id=e.target.id;
            let drop_func=()=>{
                file_array = e.dataTransfer.files;//array
                if(file_array){
					let num=Number(file_id.split("-")[1]);//e.target.id?
                    let o_num=button_array[num].order;//order_count
                    if((button_array.length-o_num)>=file_array.length){//order_a?
                        assign_count=file_array.length;
                        //console.log("if video_check_count="+video_check_count);
                    }
                    else{
                        assign_count=button_array.length-o_num;//order_array.length-o_c;//order_a?
                        //console.log("else video_check_count="+video_check_count);
                    }
                    if(user_device.indexOf("safari")>=0 && user_device.indexOf("version")>=0){
                        console.log("safari");
                        let config_page='<div class="right_click_lay_div_safari">';
                        if(assign_count==1){
                            config_page+=debi("bnn-"+num).innerHTML;
                        }
                        else{
                            config_page+=debi("bnn-"+num).innerHTML+"  to  "+((Number(debi("bnn-"+num).innerHTML)+assign_count)+"").padStart(2, '0');
                        }
                        config_page+='<input type="button" id="b_change" class="size_13" value="Seek Sounds" onClick="throw_to_seek()">';
                        config_page+='<input type="button" id="b_clear" class="size_13" value="Quit" onClick="choice_again()">';
                        config_page+='</div>';
                        debi("confirm_lay").innerHTML=config_page;
                        debi("confirm_lay_background").style.display='flex';
                        debi("confirm_lay").style.display='block';
                    }
                    else{
                        throw_to_seek(o_num);
                    }
                }   
                else{
                    alert("Sorry no data");
                }
            }
            if(debi("movie-"+e.target.id.split("-")[1]).innerHTML==""){
                drop_func();
                e.stopPropagation();
                e.preventDefault();
            }
            else{
                if(debi("mov-"+e.target.id.split("-")[1]).paused){
                    drop_func();
                    e.stopPropagation();
                    e.preventDefault();
                }
            }
        }
        else{
            e.stopPropagation();
            e.preventDefault();
        }
    }
    e.stopPropagation();
    e.preventDefault();
    //console.log("drop_final drag_ele.id="+drag_ele.id);
});

function drop_mup(e){
    let num=Number(drag_ele.id.split("-")[1]);
    let b_bgd_w=debi("button_background").style.width.replace(/p/g,"");
    b_bgd_w=Number(b_bgd_w.replace(/x/g,""));
    let b_bgd_h=debi("button_background").style.height.replace(/p/g,"");
    b_bgd_h=Number(b_bgd_h.replace(/x/g,""));
    let l_p_f=0;//left_place_1
    let l_p_s=0;//left_place_2
    let t_p=0;//top_place
    let w_c=b_bgd_w/(100+20);//wide_count //100px around 10px
    let h_c=b_bgd_h/(100+20);//high_count
    let left_n=-1;//left_number
    let top_n=-1;//top_number

    for(let i=0;i<h_c;i++){
        if(i==0){
            t_p=110;
        }
        else{
            t_p+=120;
        }
        if(i==h_c-1){
            t_p+=10;
        }
        if(e.pageY - debi("button_background").offsetTop>=0 && e.pageY - debi("button_background").offsetTop<=t_p){
            top_n=i;
            break
        }
    }
    let drop_count=(w_c-1)+2;
    for(let i=0;i<drop_count;i++){
        if(i==0){
            l_p_s=10;
        }
        else if(i==drop_count-1){
            l_p_f=l_p_s+100;
            l_p_s+=110;
        }
        else{
            l_p_f=l_p_s+100;
            l_p_s+=120;
        }
        //console.log("l_p_f="+l_p_f+" l_p_s="+l_p_s);
        if(e.pageX - debi("button_background").offsetLeft>l_p_f && e.pageX - debi("button_background").offsetLeft<l_p_s){
            console.log("i="+i);
            left_n=i;
            break;
        }
    }
    //console.log("left_n="+left_n+" top_n="+top_n);
    console.log("target_num="+((drop_count-1)*top_n+left_n));//to_number
    let do_num=Number(debi("dummy").style.order)//with_number
    
    if(left_n>=0 && top_n>=0){
        /*let stamp_order_num=(b_num,t_num)=>{
            console.log("debi(b-"+num+").style.order="+debi("b-"+num).style.order);
            button_array[b_num].order=do_num;
            console.log("button_array["+b_num+"].order="+button_array[b_num].order);
            debi("b-"+b_num).style.order=do_num;
            console.log("debi(b-"+b_num+").style.order="+debi("b-"+b_num).style.order);                
        }*/
        let t_num=(drop_count-1)*top_n+left_n;//to_number
        console.log("t_num="+t_num+" do_num="+do_num);
        if(t_num>do_num){
            console.log("t_num>do_num 上り割り込み");
            button_array[num].order=t_num-1;
            debi("b-"+num).style.order=t_num-1;
            let spliced_num=order_array.splice(do_num, 1)[0];
            order_array.splice(t_num-1, 0, spliced_num);
            console.log(order_array);
            for(let k=0;k<(t_num-1)-do_num;k++){
                //console.log("k="+k);
                debi("b-"+order_array[do_num+k]).style.order=do_num+k;
                button_array[order_array[do_num+k]].order=do_num+k;
            }
        }
        else if(t_num<do_num){
            console.log("t_num<do_num 下り割り込み");
            button_array[num].order=t_num;
            debi("b-"+num).style.order=t_num;
            let spliced_num=order_array.splice(do_num, 1)[0];
            order_array.splice(t_num, 0, spliced_num);
            console.log(order_array);
            for(let k=0;k<do_num-t_num;k++){
                //console.log("k="+k);
                debi("b-"+order_array[do_num-k]).style.order=do_num-k;
                button_array[order_array[do_num-k]].order=do_num-k;
            }
        }
    }
    else{
        let t_num=0;
        if(e.target.id.indexOf("bld-")>=0){
            t_num=Number(debi("b-"+e.target.id.split("-")[1]).style.order);
            console.log("bld- b- t_num="+t_num);
            let b_num=Number(e.target.id.split("-")[1]);
            console.log("b_num="+b_num);
            if(button_array[b_num].url!=undefined){
                console.log("closs");
                button_array[num].order=t_num;
                //console.log("button_array["+num+"].order="+button_array[num].order);
                debi("b-"+num).style.order=t_num;
                //console.log("debi(b-"+num+").style.order="+debi("b-"+num).style.order);
                button_array[b_num].order=do_num;
                //console.log("button_array["+b_num+"].order="+button_array[b_num].order);
                debi("b-"+b_num).style.order=do_num;
                //console.log("debi(b-"+b_num+").style.order="+debi("b-"+b_num).style.order);
                let change_a=order_array[do_num];
                let change_b=order_array[t_num];
                order_array[do_num]=change_b;
                order_array[t_num]=change_a;
                //let spliced_num=order_array.splice(do_num, 1)[0];
                //order_array.splice(t_num, 0, spliced_num);
                console.log(order_array);
            }
        }
    }
    
    //console.log("button_array["+num+"].order="+button_array[num].order);
    //console.log("debi(b-"+num+").style.order="+debi("b-"+num).style.order);
    debi("b-"+num).style.zIndex=0;
	debi("b-"+num).style.position="relative";
    debi("b-"+num).style.left="0px";
    debi("b-"+num).style.top="0px";
    debi("dummy").style.display="none";//none <- flex
    drag_ele.style.visibility="visible";//visible <- hidden
    let button_order_line=""
    for(let i=0;i<button_array.length;i++){
        let order_num;
        if(button_array[i].order<9){
            order_num='0'+((button_array[i].order)+1);
            
        }    
        else{
            order_num=button_array[i].order+1;
        }
        debi("bnn-"+i).innerHTML=order_num;
        button_array[i].content=debi("b-"+i).innerHTML;
        button_order_line+=button_array[i].order+" ";
    }
    console.log("button_order_line="+button_order_line);
    drag_ele=undefined;
    drag_move=0;
    debi("b-"+num).draggable=false;
}

document.addEventListener("mouseup", (e)=>{//fader_div
    //console.log("mouseup="+drag_move);
    //console.log("mouseup e.target.id="+e.target.id);
    //console.log("mouseup e.target.parentNode.id="+e.target.parentNode.id);
    if(e.target.parentNode.id=="tool_bar" || e.target.parentNode.parentNode.id=="tool_bar"){//tool_bar draggable
        debi("tool_bar").draggable=false;
        console.log("debi(tool_bar).draggable="+debi("tool_bar").draggable);
    }
	else if(e.target.parentNode.id.indexOf("b-")>=0){
        let num=Number(e.target.id.split("-")[1]);
        debi("b-"+num).draggable=false;
        console.log("debi(b-"+num+").draggable="+debi("b-"+num).draggable);
	}
    else{
    }
});

/*right click confirm*/
var assign_count=0;
function link_data(){
    file_array = debi("selected_data").files;
    let num=Number(file_id.split("-")[1]);//button_array index number
    let o_num=button_array[num].order;//button_array index number
    if(file_array){
        if((button_array.length-o_num)>=file_array.length){//order_a?
            assign_count=file_array.length;
        }
        else{
            assign_count=button_array.length-o_num;//order_array.length-num;//order_a?
        }
        if((user_device.indexOf("safari")>=0 && user_device.indexOf("version")>=0) || user_device.indexOf("iphone")>=0 || user_device.indexOf("ipad")>=0){
            console.log("safari&ipad");
            if(debi("right_click_background").style.display=='block'){
                debi("right_click_background").style.display='none';
                debi("right_click_lay").innerHTML="";
                debi("right_click_lay").style.display='none';
            }   
            let config_page='<div class="safari_right_click_lay_div">';
            if(assign_count==1){
                config_page+=debi("bnn-"+num).innerHTML;
            }
            else{
                config_page+=debi("bnn-"+num).innerHTML+"  to  "+((Number(debi("bnn-"+num).innerHTML)+assign_count-1)+"").padStart(2, '0');
            }
            config_page+='<input type="button" id="b_change" class="size_13" value="Seek Sounds" onClick="throw_to_seek(Number(\''+o_num+'\'))">';//''+para+'' -> 'real' -> string -> Number(string)
            config_page+='<input type="button" id="b_clear" class="size_13" value="Quit" onClick="choice_again()">';
            config_page+='</div>';
            debi("confirm_lay").innerHTML=config_page;
            debi("confirm_lay_background").style.display='flex';
            debi("confirm_lay").style.display='block';
        }
        else{
            throw_to_seek(o_num);
        }
    }
	else{
		alert("Sorry no data");
	}
}

function throw_to_seek(o_num){
    console.log("throw_to_seek o_num="+o_num);
    let alert_count=0;
    if(debi("confirm_lay_background").style.display=='flex'){
        debi("confirm_lay_background").style.display='none';
        debi("confirm_lay").innerHTML="";
        debi("confirm_lay").style.display='none';
    }
    console.log("seek_alert_on");
    seek_alert_on();
    for (let i=0;i<assign_count;i++){
        if(file_array[i]){
            if(file_array[i].type.indexOf("audio")>=0){
                for(let j=0;j<button_array.length;j++){
                    if(button_array[j].order==o_num){
                        //console.log("j="+j);
                        button_array[j].name=file_array[i].name;
                        button_array[j].type=file_array[i].type;
                        button_array[j].data=file_array[i];
                        let create=URL.createObjectURL(file_array[i]);// faster than readAsDataURL()
                        button_array[j].url=create;
                        button_array[j].loop=false;
                        seek_nosound_time(j);//,button_array[num].data
                        break;
                    }
                }
            }
            o_num++;
        }
        else{
            alert_count++;
        }
    }
    debi("selected_data").value="";
    file_array=[];
    if(alert_count==1){
        alert("Sorry "+alert_count+" file no sound data");
    }
    else if(alert_count>1){
        alert("Sorry "+alert_count+" files no sound data");
    }
}

function seek_alert_on(){
    let seeking_line='<div class="seek_lay_div">';
    seeking_line+='<span style="color:hsla(0,0%,45%,1.00)">';
    seeking_line+='adjusting cue timing of sounds';
    seeking_line+='</span>';
    seeking_line+='</div>';
    debi("seek_lay").innerHTML=seeking_line;
    debi("seek_lay_background").style.display='flex';
    debi("seek_lay").style.display='block';
}

function seek_alert_off(){
    debi("seek_lay").innerHTML="";
    debi("seek_lay").style.display='none';
    debi("seek_lay_background").style.display='none';
}

function seek_nosound_time(num){
    //console.log("num="+num);
    const audioElement = new Audio(button_array[num].url);
    let context = new AudioContext();
    let nodeSource = context.createMediaElementSource(audioElement);//
    let gainNode = context.createGain();
    gainNode.gain.value=0;
    let nodeAnalyser = context.createAnalyser();
    nodeAnalyser.fftSize = FFT_SIZE;
    nodeSource.connect(nodeAnalyser);
    let running;
    let visloop=()=>{
		const freqByteData = new Uint8Array(FFT_SIZE / 2);
		nodeAnalyser.getByteFrequencyData(freqByteData);
		for (let i = 0; i < freqByteData.length; i++){
			const freqSum = freqByteData[i];
			if(freqSum>5){
                audioElement.pause();
                running=audioElement.currentTime;//.toFixed(3)
	            clearInterval(button_array[num].visualizer);
                button_array[num].visualizer=undefined;
                //console.log("num="+num+" running="+running);
                if((user_device.indexOf("safari")>=0 && user_device.indexOf("version")>=0)){// || user_device.indexOf("iphone")>=0 || user_device.indexOf("ipad")>=0){
                    if(running<0.3){
                        button_array[num].start=0;
                    }
                    else{
                        let start_jikan=running%0.3;
                        console.log(start_jikan);
                        if(start_jikan<0.1){
                            start_jikan+=0.1;
                        }
                        start_jikan=running-start_jikan;
                        button_array[num].start=start_jikan;
                        console.log("button_array["+num+"].start="+button_array[num].start);
                    }
                }
                else{
                    if(running<0.2){
                        button_array[num].start=0;
                    }
                    else{
                        let start_jikan=running%0.2;
                        console.log(start_jikan);
                        if(start_jikan<0.1){
                            start_jikan+=0.1;
                        }
                        start_jikan=running-start_jikan;
                        button_array[num].start=start_jikan;
                        console.log("button_array["+num+"].start="+button_array[num].start);
                    }
    
                }
                assign_count--;
                assign_data(num);
                if(assign_count==0){
                    seek_alert_off();
                }
                break;
            }
		}
	}
 	//console.log("audioElement.play()");
    audioElement.play();
    button_array[num].visualizer=setInterval(()=>{visloop()},10);
}

var file_id="";
var con_x;//config
var con_y;

function double_tap(e){
    if(e.target.id){
        if(e.target.id.indexOf("bld-")>=0){
			file_id=e.target.id;
			let num=Number(e.target.id.split("-")[1]);
            if(debi("movie-"+e.target.id.split("-")[1]).innerHTML==""){
                console.log("right click file_id="+file_id);
                if(debi("selected_data")){
                    let config_page='<div class="safari_right_click_lay_div">';
                        config_page+='<span class="break_words">';
                            config_page+=debi("bnn-"+num).innerHTML;
                        config_page+='</span>';
                        config_page+='<input type="button" id="b_change" class="size_13" value="Select Sounds" onClick="change_data()">';
                        config_page+='<input type="button" id="b_clear" class="size_13" value="Quit" onClick="close_r_click()">';
                    config_page+='</div>';
                    //console.log("config_page="+config_page);
                    debi("right_click_lay").innerHTML=config_page;
                    debi("right_click_background").style.display='block';
                    debi("right_click_lay").style.display='flex';
                    if(window.innerWidth-(e.pageX+50)<debi("right_click_lay").clientWidth){
                        con_x=window.innerWidth-(debi("right_click_lay").clientWidth);
                    }
                    else{
                        con_x=e.pageX+50;
                    }
                    if(window.innerHeight-e.pageY<40){
                        con_y=window.innerHeight-40;
                    }
                    else if(e.pageY-200<0){
                        con_y=0;					   
                    }
                    else{
                        con_y=e.pageY-200;
                    }
                    debi("right_click_lay").style.left=con_x+"px";
                    debi("right_click_lay").style.top=con_y+"px";			
                    trans_check=0;
                    console.log("never go to button_trans");
                }
			}
            else{
				let config_page='<div class="right_click_lay_div">';
					config_page+='<span class="break_words">';
						config_page+=debi("bdn-"+num).innerHTML;
					config_page+='</span>';
					config_page+='<div class="e-v_div_style">';
						config_page+='<div class="e-v-line_div_style">';
							config_page+='<span id="EV">Volume</span>';
							config_page+='<span id="each_qty">0.0</span>';
						config_page+='</div>';
                        config_page+='<input type="range" id="each" class="each" min="0" max="10" step="0.5" onchange="slide_each('+num+')">';
					config_page+='</div>';
                    config_page+='<div class="e-v-line_div_style">';
                        config_page+='<label>';
                            config_page+='<input type="radio" name="play" value="1" id="play_whr0" checked onchange="play_whr('+num+')">Cue';//where
                        config_page+='</label>';
                        config_page+='<label>';
                            config_page+='<input type="radio" name="play" value="0" id="play_whr1" onchange="play_whr('+num+')">Continue';
                        config_page+='</label>';
                    config_page+='</div>';
                    config_page+='<label>';
                        config_page+='<input type="checkbox" name="loop" value="0" id="loop" onchange="play_end('+num+')">Loop';
                    config_page+='</label>';
                if(debi("mov-"+num).paused){
					config_page+='<input type="button" id="b_change" class="size_13" value="Change" onClick="change_data()">';
					config_page+='<input type="button" id="b_clear" class="size_13" value="Clear" 	onClick="clear_confirm('+num+')">';
                }
				config_page+='<input type="button" id="b_clear" class="size_13" value="Close" onClick="close_r_click()">';
				config_page+='</div>';
				debi("right_click_lay").innerHTML=config_page;
				debi("right_click_background").style.display='block';
				debi("right_click_lay").style.display='flex';
				if(window.innerWidth-(e.pageX+50)<debi("right_click_lay").clientWidth){
					con_x=window.innerWidth-(debi("right_click_lay").clientWidth);
				}
				else{
					con_x=e.pageX+50;
				}
				if(window.innerHeight-e.pageY<40){
					con_y=window.innerHeight-40;
				}
				else if(e.pageY-200<0){
					con_y=0;					   
				}
				else{
					con_y=e.pageY-200;
				}
				debi("right_click_lay").style.left=con_x+"px";
				debi("right_click_lay").style.top=con_y+"px";			
				if(button_array[num].cue==1){
					debi("play_whr0").checked=true;   
				}
				else{
					debi("play_whr1").checked=true;
				}
				debi("loop").checked=button_array[num].loop;
				//console.log("debi(loop).checked="+debi("loop").checked);
				debi("each").value=debi("each_qty").innerHTML=(button_array[num].volume*10).toFixed(1);
				//console.log("clearTimeout-ID="+long_down);
                trans_check=0;
				console.log("never go to button_trans");
				//console.log("trans_check="+trans_check);
            }
        }
        else{
            //console.log("clearTimeout-ID="+long_down);
            trans_check=0;
            console.log("trans_check="+trans_check);
        }
    }
    else{
        console.log("no target");
    }
    //console.log("clearTimeout-ID="+long_down);
    trans_check=0;
}

document.oncontextmenu =(e)=>{//right click safari ???
    e.stopPropagation();
    e.preventDefault();

    if(e.target.id){
        if(e.target.id.indexOf("bld-")>=0){
			file_id=e.target.id;//debi("bld-")
            console.log("file_id="+file_id);
			let num=Number(e.target.id.split("-")[1]);
            if(debi("movie-"+e.target.id.split("-")[1]).innerHTML==""){
                if((user_device.indexOf("safari")>=0 && user_device.indexOf("version")>=0) || user_device.indexOf("iphone")>=0 || user_device.indexOf("ipad")>=0){
                    console.log("safari&ipad");
                    double_tap(e);
                }
                else{
                    if(debi("selected_data")){
                        console.log("debi(selected_data) true");
                        debi("selected_data").click();// onchange="link_data()"
                    }
                }
			}
            else{
				let config_page='<div class="right_click_lay_div">';
					config_page+='<span class="break_words">';
						config_page+=debi("bdn-"+num).innerHTML;
					config_page+='</span>';
					config_page+='<div class="e-v_div_style">';
						config_page+='<div class="e-v-line_div_style">';
							config_page+='<span id="EV">Volume</span>';
							config_page+='<span id="each_qty">0.0</span>';
						config_page+='</div>';
                        config_page+='<input type="range" id="each" class="each" min="0" max="10" step="0.5" onchange="slide_each('+num+')">';
					config_page+='</div>';
                    config_page+='<div class="e-v-line_div_style">';
                        config_page+='<label>';
                            config_page+='<input type="radio" name="play" value="1" id="play_whr0" checked onchange="play_whr('+num+')">Cue';//where
                        config_page+='</label>';
                        config_page+='<label>';
                            config_page+='<input type="radio" name="play" value="0" id="play_whr1" onchange="play_whr('+num+')">Continue';
                        config_page+='</label>';
                    config_page+='</div>';
                    config_page+='<label>';
                        config_page+='<input type="checkbox" name="loop" value="0" id="loop" onchange="play_end('+num+')">Loop';
                    config_page+='</label>';
                if(debi("mov-"+num).paused){
					config_page+='<input type="button" id="b_change" class="size_13" value="Change" onClick="change_data()">';
					config_page+='<input type="button" id="b_clear" class="size_13" value="Clear" 	onClick="clear_confirm('+num+')">';
                }
				config_page+='<input type="button" id="b_clear" class="size_13" value="Close" onClick="close_r_click()">';
				config_page+='</div>';
				debi("right_click_lay").innerHTML=config_page;
				debi("right_click_background").style.display='block';
				debi("right_click_lay").style.display='flex';
				if(window.innerWidth-(e.pageX+50)<debi("right_click_lay").clientWidth){
					con_x=window.innerWidth-(debi("right_click_lay").clientWidth);
				}
				else{
					con_x=e.pageX+50;
				}
				if(window.innerHeight-e.pageY<40){
					con_y=window.innerHeight-40;
				}
				else if(e.pageY-200<0){
					con_y=0;					   
				}
				else{
					con_y=e.pageY-200;
				}
				debi("right_click_lay").style.left=con_x+"px";
				debi("right_click_lay").style.top=con_y+"px";			
				if(button_array[num].cue==1){
					debi("play_whr0").checked=true;   
				}
				else{
					debi("play_whr1").checked=true;
				}
				debi("loop").checked=button_array[num].loop;
				//console.log("debi(loop).checked="+debi("loop").checked);
				debi("each").value=debi("each_qty").innerHTML=(button_array[num].volume*10).toFixed(1);
				//console.log("clearTimeout-ID="+long_down);
                trans_check=0;
				console.log("never go to button_trans");
				//console.log("trans_check="+trans_check);
            }
        }
        else{
            //console.log("clearTimeout-ID="+long_down);
            trans_check=0;
            console.log("trans_check="+trans_check);
        }
    }
    //console.log("clearTimeout-ID="+long_down);
    trans_check=0;
};

function play_whr(num){
    if(debi("play_whr0").checked){
        button_array[num].cue=1;
        if(debi("mov-"+num).paused){
            debi("mov-"+num).currentTime=0+button_array[num].start;
            debi("bti-"+num).innerHTML=debi("mov-"+num).currentTime.toFixed(1)+"/";
        }
    }
    else{
        button_array[num].cue=0;
    }
}

function play_end(num){
    if(debi("loop").checked){
        button_array[num].loop=true;
    }
    else{
        button_array[num].loop=false;
    }
    //console.log("debi(mov-"+num+").loop="+debi("mov-"+num).loop);
    button_array[num].content=debi("b-"+num).innerHTML;
}

function change_data(){
	debi("selected_data").click();// onchange="link_data()"
}

function clear_confirm(num){
    let confirm_page='<span class="break_words">';
        confirm_page+="Clear Assigned Continue ?";
    confirm_page+='</span>';
    confirm_page+='<div class="e-v-line_div_style">';
        confirm_page+='<label>';
            confirm_page+='<input type="button" id="b_no" class="size_13" value="NO" onClick="clear_no()">';
        confirm_page+='</label>';
        confirm_page+='<label>';
            confirm_page+='<input type="button" id="b_yes" class="size_13" value="YES" onClick="clear_data('+num+')">';
        confirm_page+='</label>';
    confirm_page+='</div>';
    debi("clear_lay").innerHTML=confirm_page;
    debi("clear_lay_background").style.display='block';
    debi("clear_lay").style.display='flex';
    debi("clear_lay").style.left=con_x+"px";
    debi("clear_lay").style.top=(con_y+140)+"px";	
}

function clear_no(num){
	debi("clear_lay").innerHTML="";
	debi("clear_lay").style.display='none';
	debi("clear_lay_background").style.display='none';
}

function clear_data(num){
    if(colorb_c==1){
        //let hue_num=button_array[num].color=180-(360/order_array.length)*i;
        //debi("b-"+num).style.backgroundColor="hsla("+hue_num+",70%,50%,0.60)";
        //debi("b-"+num).style.borderTop="0px solid "+"hsla("+hue_num+",90%,35%,0.80)";
        //debi("b-"+num).style.borderLeft="0px solid "+"hsla("+hue_num+",90%,35%,0.80)";
        //debi("b-"+num).style.borderBottom="4px solid "+"hsla("+hue_num+",90%,35%,0.80)";
        //debi("b-"+num).style.borderRight="4px solid "+"hsla("+hue_num+",90%,35%,0.80)";
        //debi("bnn-"+num).style.color="hsla("+hue_num+",90%,35%,0.80)";
        //debi("btd-"+num).style.backgroundColor="hsla("+hue_num+",75%,45%,0.40)";
        button_array[num].content="";
        //debi("b-"+num).innerHTML;
    }
    else{
        debi("b-"+num).style.backgroundColor="hsla("+button_array[num].color+",0%,75%,1.00)";
        debi("b-"+num).style.border="2px solid hsla("+button_array[num].color+",0%,50%,1.00)";
        debi("bnn-"+num).style.color="hsla("+button_array[num].color+",0%,100%,1.00)";//white
        debi("bnn-"+num).className="b_number_off";
    }
    debi("bti-"+num).innerHTML="";
    debi("bt-"+num).innerHTML="";
    debi("bdn-"+num).innerHTML="";
    debi("bdn-"+num).innerHTML="";//white
    debi("movie-"+num).innerHTML="";
    button_array[num].type="";
    button_array[num].data="";
    button_array[num].url="";
    button_array[num].name="";
    button_array[num].volume=0.75;
	button_array[num].cue=1,
	button_array[num].loop=false;
    button_array[num].content=debi("b-"+num).innerHTML;
	debi("clear_lay").style.display='none';
	debi("clear_lay_background").style.display='none';
	debi("right_click_lay").style.display='none';
	debi("right_click_background").style.display='none';
    for (let i = 0; i < FFT_SIZE/2; i++) {
        debi("box-"+num+"_L-"+i).style.width = "0px";
        debi("box-"+num+"_R-"+i).style.width = "0px";
    }

}

function close_r_click(){
	debi("right_click_background").style.display='none';
	debi("right_click_lay").style.display='none';	
}

/*button pad click*/
var array_num=-1
var waiting_num=-1;
var trans_check=0;
document.addEventListener("click", (e)=>{
    //console.log("click e.target.id="+e.target.id);
    //console.log("click e.terget.parentNode.id="+e.target.parentNode.id);
    if(e.target.id){
        if(e.target.id.indexOf("bld-")>=0){
			let num=Number(e.target.id.split("-")[1]);
            if(trans_check==0/* && get_id==e.target.id*/){	
                debi("b-"+num).draggable=false;
                //console.log('click debi("b-'+num+'").draggable='+debi("b-"+num).draggable);
                play_check(num);
                //console.log("clearTimeout-ID="+long_down);
                trans_check=0;
            }
            else{
                console.log("click not go to button_trans");           
            }
            //console.log("click temp_array="+temp_array);
            //console.log("click order_array="+order_array);
        }
    }
    else{
        console.log("NULL");
    }
});

function play_check(num){
	if(debi("movie-"+num).innerHTML!=""){
		if(debi("mov-"+num).paused){
			waiting_num=num;
			let on_check=0;
			for(let i=0;i<button_array.length;i++){
				if(button_array[i].on==1){
					if(button_array[i].type.indexOf("audio")>=0){
						on_check=1;
						array_num=i;
					}
					else{
						//open("movie.html","Display Window",window_options);
						//window.focus();
					}
					break;
				}
			}
			if(on_check==0){
				if(button_array[waiting_num].fading==0){
					if(fade_on==1){
						start_to_play(waiting_num,1);
					}
					else{
						start_to_play(waiting_num,0);
					}
				}
				else{
					console.log("Fadimg Now !")
				}
			}
			else{
                trans_check=0;
				if(button_array[array_num].fading==0){
					stop_playing(array_num); 
					if(fade_on==1){
						start_to_play(waiting_num,1);
					}
					else{
						start_to_play(waiting_num,0);
					}
				}
				else{
					console.log("Fadimg Now !")
				}
			}
		}
		else{
			array_num=num;
			if(button_array[array_num].type.split(",")[0].indexOf("audio")>=0){
				if(button_array[array_num].fading==0){
                    stop_playing(array_num);                            
				}
				else{
                    console.log("Fading Now !")
				}
			}
			else{
				//open("movie.html","Display Window",window_options);
				//window.focus();
			}
		}	
	}
	else{
	}
}

/*space key event*/
document.onkeydown=key_down; //ページ
function key_down(event){//
    if(event.key==" " || event.key=="　"){//
		for(let i=0;i<button_array.length;i++){
			if(button_array[i].on==1){
				if(button_array[i].type.indexOf("audio")>=0){
                    if(button_array[i].fading==0){
                        stop_playing(i);
                    }
				}
				else{
					//open("movie.html","Display Window",window_options);
					//window.focus();
				}
				break;
			}
		}
	}
}

/*sound fade in*/
var in_time=0;
function sound_fade_in(num){
    in_time+=0.1;
    if(fi_time<=in_time){
        button_array[num].gainNode.gain.value=button_array[num].volume*m_v/10;
        debi("bld-"+num).style.backgroundColor="hsla("+button_array[num].color+",0%,100%,0.00)";
        debi("bld-"+num).innerHTML="";
        button_array[num].fading=0;
        in_time=0;
        fade_on=0;
		flick_on=0;
        debi("f_b").style.color="hsla(208,100%,97%,1.00)";
        debi("f_b_div").style.backgroundColor="hsla(0,0%,67%,1.00)";
    }
    else if(in_time<fi_time/2){
        button_array[num].gainNode.gain.value=(2/Math.pow(fi_time,2))*(Math.pow(in_time,2))*(button_array[num].volume*m_v/10);
        if(in_time.toFixed(1)*10%2==1){
            if(out_time==0){
               f_b_flick();
            }
            if(debi("bld-"+num).innerHTML==""){
                debi("bld-"+num).innerHTML='<span style="font-size:28pt;  font-weight:bold;transform: scale(1, 1.25); color:hsla(0,0%,100%,1.00);">IN</span>';
            }
            else{
                debi("bld-"+num).innerHTML="";
            }
        }
    }
    else{
        button_array[num].gainNode.gain.value=((-(2/Math.pow(fi_time,2))*Math.pow((in_time-fi_time),2))+1)*(button_array[num].volume*m_v/10);
        if(in_time.toFixed(1)*10%2==1){
            if(out_time==0){
                f_b_flick();
            }
            if(debi("bld-"+num).innerHTML==""){
                debi("bld-"+num).innerHTML='<span style="font-size:28pt;  font-weight:bold;transform: scale(1, 1.25); color:hsla(0,0%,100%,1.00);">IN</span>';
            }
            else{
                debi("bld-"+num).innerHTML="";
            }
        }
    }
}

/*sound fade out*/
var out_time=0;
function sound_fade_out(num){
    out_time+=0.1;
    if(fo_time<=out_time){
		button_array[num].gainNode.gain.value=0;
		debi("bld-"+num).style.backgroundColor="hsla("+button_array[num].color+",0%,100%,0.00)";
        debi("bld-"+num).innerHTML="";
		button_array[num].fading=0;
        //console.log("button_array["+num+"].fading="+button_array[num].fading);
        out_time=0;
        fade_on=0;
		flick_on=0;
        debi("f_b").style.color="hsla(208,100%,97%,1.00)";
        debi("f_b_div").style.backgroundColor="hsla(0,0%,67%,1.00)";
        to_end(num); 
    }
    else if(out_time<fo_time/2){
        button_array[num].gainNode.gain.value=(-(2/Math.pow(fo_time,2)*Math.pow(out_time,2))+1)*(button_array[num].volume*m_v/10);
        //console.log("debi(mov-"+num+").volume="+debi("mov-"+num).volume);
        if(out_time.toFixed(1)*10%2==1){
            f_b_flick();
			if(debi("bld-"+num).innerHTML==""){
                debi("bld-"+num).innerHTML='<span style="font-size:28pt; font-weight:bold; transform: scale(1, 1.25); color:hsla(0,0%,100%,1.00);">OUT</span>';
			}
            else{
				debi("bld-"+num).innerHTML="";
            }
        }
 	}
    else{
        button_array[num].gainNode.gain.value=(2/Math.pow(fo_time,2))*Math.pow((out_time-fo_time),2)*(button_array[num].volume*m_v/10);
        //console.log("debi(mov-"+num+").volume="+debi("mov-"+num).volume);
        if(out_time.toFixed(1)*10%2==1){
			f_b_flick();
            //console.log("out flick");
            if(debi("bld-"+num).innerHTML==""){
                debi("bld-"+num).innerHTML='<span style="font-size:28pt;  font-weight:bold;transform: scale(1, 1.25); color:hsla(0,0%,100%,1.00);">OUT</span>';
            }
            else{
                debi("bld-"+num).innerHTML="";
            }
        }
    }
}

/*time*/
function t_ing(num){//time progress
    let running=debi("mov-"+num).currentTime.toFixed(3)-button_array[num].start.toFixed(3);
    //console.log("running="+running);
    let second;
    if(Math.floor(running/60)==0){
        running=running.toFixed(1);
    }
    else{
        if((running-(60*Math.floor(running/60))).toFixed(1)<10){
            second="0"+(running-(60*Math.floor(running/60))).toFixed(1);
            running=Math.floor(running/60)+'"'+second;
        }
        else{
            running=Math.floor(running/60)+'"'+(running-(60*Math.floor(running/60))).toFixed(1);
        }
    }
    debi("bti-"+num).innerHTML=running+"/";
    if(button_array[num].fading==1){
        sound_fade_out(num);
    }
    if(button_array[num].fading==2){
        sound_fade_in(num);
    }
}

/*Audio object*/
function make_audio(num){
    this.audioElement = debi("mov-"+num);
    this.context = new AudioContext();
    this.nodeSource = context.createMediaElementSource(audioElement);//
    this.gainNode = context.createGain();
}

/*start to play*/
console.log("start to play");
var fi_time=0;
const FFT_SIZE = 64;
function start_to_play(num,fade){
    const context = new AudioContext();
    const nodeSource = context.createMediaElementSource(debi("mov-"+num));//
    button_array[num].gainNode = context.createGain();
    button_array[num].gainNode.gain.value=button_array[num].volume*m_v/10;
    console.log("button_array["+num+"].gainNode.gain.value)="+button_array[num].gainNode.gain.value);
    nodeSource.connect(button_array[num].gainNode).connect(context.destination);
    const splitter_L = context.createChannelSplitter(2);
    const merger_L = context.createChannelMerger(2);
    const splitter_R = context.createChannelSplitter(2);
    const merger_R = context.createChannelMerger(2);
    let nodeAnalyser_L = context.createAnalyser();
    let nodeAnalyser_R = context.createAnalyser();
    nodeAnalyser_L.fftSize = FFT_SIZE;
    nodeAnalyser_R.fftSize = FFT_SIZE;
    // 0～1の範囲でデータの動きの速さ 0だともっとも速く、1に近づくほど遅くなる
    nodeAnalyser_L.smoothingTimeConstant = 0.75;
    nodeAnalyser_R.smoothingTimeConstant = 0.75;
    nodeSource.connect(button_array[num].gainNode).connect(splitter_L).connect(merger_L, 0, 0).connect(nodeAnalyser_L);
    nodeSource.connect(button_array[num].gainNode).connect(splitter_R).connect(merger_R, 1, 1).connect(nodeAnalyser_R);
    let g_count=0;
 	let graph_ing=()=>{
        console.log("graph_ing="+g_count);
 		button_array[num].visualizer=requestAnimationFrame(visloop);
        g_count++;
	}

	let visloop=()=>{
		//console.log("visloop=()");
		// 波形データを格納する配列の生成
		const freqByteData_L = new Uint8Array(FFT_SIZE / 2);
		const freqByteData_R = new Uint8Array(FFT_SIZE / 2);
		// それぞれの周波数の振幅を取得
		nodeAnalyser_L.getByteFrequencyData(freqByteData_L);
		nodeAnalyser_R.getByteFrequencyData(freqByteData_R);
		// 高さの更新
		for (let i = 0; i < freqByteData_L.length; i++) {
			const freqSum_L = freqByteData_L[i];
			const freqSum_R = freqByteData_R[i];
            // 値は256段階で取得できるので正規化して 0.0 〜 1.0 の値にする
            const scale_L = freqSum_L / 256;
            const scale_R = freqSum_R / 256;
            // Y軸のスケールを変更
			debi("box-"+num+"_L-"+i).style.background=debi("btd-"+num).style.backgroundColor;
			debi("box-"+num+"_R-"+i).style.background=debi("btd-"+num).style.backgroundColor;
			debi("box-"+num+"_L-"+i).style.width = (50*scale_L)+"px";
			debi("box-"+num+"_R-"+i).style.width = (50*scale_R)+"px";
            //console.log("freqByteData = "+i);
		}
		button_array[num].visualizer=requestAnimationFrame(visloop);
	}

    if(fade==1 && debi("fader").value!=0){//引数を受けている fade_on
        button_array[num].gainNode.gain.value=0;//
		fi_time=Number(debi("fader").value);
        button_array[num].fading=2;//sound_fade_in(num);
        debi("bld-"+num).style.backgroundColor="hsla("+button_array[num].color+",50%,50%,0.30)";
    }
    console.log("debi(mov-"+num+").play()");
    debi("mov-"+num).play();
    graph_ing();
    //console.log("ended_count first");
    button_array[num].on=1;
    button_array[num].timer=setInterval(()=>{t_ing(num)},100);
    let hue_num=button_array[num].color;
    debi("b-"+num).style.backgroundColor="hsla("+hue_num+",70%,50%,0.10)";
    debi("b-"+num).style.borderTop="2px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderLeft="2px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderBottom="2px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderRight="2px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("bnn-"+num).style.color="hsla("+hue_num+",90%,35%,0.30)";
    debi("bdn-"+num).style.color="hsla("+hue_num+",90%,35%,0.80)";
    waiting_num=-1;
     
    debi("mov-"+num).addEventListener("ended", ()=>{//num=-1;
		console.log("ended in !");
		if(button_array[num].loop==true){
            console.log("button_array["+num+"].loop="+button_array[num].loop);
            //console.log("debi(mov-"+num+").loop="+debi("mov-"+num).loop);
			clearInterval(button_array[num].timer)//function name
            button_array[num].timer=undefined;
            button_array[num].gainNode.gain.value=button_array[num].volume*m_v/10
            //console.log("check");
            debi("mov-"+num).play();
            debi("mov-"+num).currentTime=0+button_array[num].start;//seeked start time
            console.log("ended debi(mov-"+num+").currentTime="+debi("mov-"+num).currentTime);
            button_array[num].timer=setInterval(()=>{t_ing(num)},100);
        }
		else{
			console.log("ended to_end");
			to_end(num);
		}
	});

}   

/*stop to play*/
var fo_time=0;
function stop_playing(num){
    if(fade_on==1 && Number(debi("fader").value!=0)){
        fo_time=Number(debi("fader").value);
        button_array[num].fading=1;
        debi("bld-"+num).style.backgroundColor="hsla("+button_array[num].color+",50%,50%,0.30)";
    }
    else{
        to_end(num);
    }
}   

function to_end(num){
    //console.log("to_end num="+num);
    debi("mov-"+num).pause();
    clearInterval(button_array[num].timer)//function name
	cancelAnimationFrame(button_array[num].visualizer);
    button_array[num].timer=undefined;//function name
	button_array[num].visualizer=undefined;
   //console.log("clear button_array[num].timer-ID="+button_array[num].timer);
    if(button_array[num].cue==1){
        debi("mov-"+num).currentTime=0+button_array[num].start;
        for (let i = 0; i < FFT_SIZE/2; i++) {
            debi("box-"+num+"_L-"+i).style.width = "0px";
            debi("box-"+num+"_R-"+i).style.width = "0px";
        }
    }
    else{
        console.log("debi(mov-"+num+").currentTime="+debi("mov-"+num).currentTime);
        console.log("debi(mov-"+num+").duration="+debi("mov-"+num).duration);
        if(debi("mov-"+num).currentTime==debi("mov-"+num).duration){
            debi("mov-"+num).currentTime=0+button_array[num].start;
            for (let i = 0; i < FFT_SIZE/2; i++) {
                debi("box-"+num+"_L-"+i).style.width = "0px";
                debi("box-"+num+"_R-"+i).style.width = "0px";
            }
        }
    }
    button_array[num].begining=debi("mov-"+num).currentTime;//生time
    button_array[num].fading=0;
    reassign(num);
    button_array[num].on=0;
}

function reassign(num){//stop & reflesh
    //console.log("assign_data()")
    debi("movie-"+num).innerHTML='<video id="mov-'+num+'" height="0px" width="0px"></video>';
    debi("mov-"+num).src=button_array[num].url;
    debi("mov-"+num).addEventListener("loadedmetadata", ()=>{
        debi("bt-"+num).innerHTML=data_duration(debi("mov-"+num).duration-button_array[num].start); 
        debi("mov-"+num).currentTime=button_array[num].begining;
        button_array[num].content=debi("b-"+num).innerHTML;
        prepare_button(num);
    });
}

function data_duration(num){
	let remaining;
	let second;
	if(Math.floor(num/60)==0){
		remaining=num.toFixed(1);
	}
	else{
		if((num-(60*Math.floor(num/60))).toFixed(1)<10){
			second="0"+(num-(60*Math.floor(num/60))).toFixed(1);
			remaining=Math.floor(num/60)+'"'+second;
		}
		else{
			remaining=Math.floor(num/60)+'"'+(num-(60*Math.floor(num/60))).toFixed(1);
		}
	}
	return remaining;
}

/*change color*/

/*eventListener*/

/*tool_bar*/
var m_v=0;//master_volume
function slide_mr(){
	m_v=Number(debi("master").value).toFixed(1);
    debi("master_qty").innerHTML=m_v;
    for(let i=0;i<button_array.length;i++){
        if(button_array[i].on==1){
            button_array[i].gainNode.gain.value=button_array[i].volume*m_v/10;
            break;
        }
        else{
            //open("movie.html","Display Window",window_options);
            //window.focus();
        }
    }
}

function slide_each(num){
	button_array[num].volume=Number(debi("each").value)/10;
    debi("each_qty").innerHTML=Number(debi("each").value).toFixed(1);
        if(button_array[num].on=1){
            button_array[num].gainNode.gain.value=button_array[num].volume*m_v/10;
            button_array[num].content=debi("b-"+num).innerHTML;
        }
        else{
            //open("movie.html","Display Window",window_options);
            //window.focus();
        }
}

function slide_fr(){
    debi("fader_qty").innerHTML=Number(debi("fader").value).toFixed(1);
}

function close_tv(){
    if(fade_on==1){
        clearInterval(flick);
        console.log("clear flick-ID="+flick);
        fade_on=0;
        debi("f_b").style.color="hsla(208,100%,97%,1.00)";
        debi("f_b_div").style.backgroundColor="hsla(0,0%,67%,1.00)";
    }
    debi("tool_bar").style.display="none";
}

document.addEventListener('dblclick', (e)=>{
	console.log("dblclickclick= "+e.target.id);
	if(e.target.id){
		if(e.target.id=="main"){
            if(debi("tool_bar").style.display=="none"){
                debi("tool_bar").style.display="flex";
                debi("master_div").style.display="flex";
                debi("fader_div").style.display="flex";
            }
            else{
                if(fade_on==1){
                    fade_on=0;
					flick_on=0;
                    debi("f_b").style.color="hsla(208,100%,97%,1.00)";
                    debi("f_b_div").style.backgroundColor="hsla(0,0%,67%,1.00)";
                }
                debi("tool_bar").style.display="none";
            }
        }
        else if(e.target.id=="button_background"){
            if(colorb_c==0){
                for(let i=0;i<button_array.length;i++){//order_a?
                    let num=i;//order_array[i];//order_a?
                    let hue_num=button_array[num].color=180-(360/order_array.length)*i;
                    debi("b-"+num).style.backgroundColor="hsla("+hue_num+",70%,50%,0.60)";
                    debi("b-"+num).style.borderTop="0px solid "+"hsla("+hue_num+",90%,35%,0.80)";
                    debi("b-"+num).style.borderLeft="0px solid "+"hsla("+hue_num+",90%,35%,0.80)";
                    debi("b-"+num).style.borderBottom="4px solid "+"hsla("+hue_num+",90%,35%,0.80)";
                    debi("b-"+num).style.borderRight="4px solid "+"hsla("+hue_num+",90%,35%,0.80)";
                    debi("bnn-"+num).className="b_number_on";
                    debi("bnn-"+num).style.color="hsla("+hue_num+",90%,35%,0.80)";
                    debi("btd-"+num).style.backgroundColor="hsla("+hue_num+",75%,45%,0.40)";
                    button_array[num].content=debi("b-"+num).innerHTML;
                }
                colorb_c=1;
            }
            else{
                for(let i=0;i<button_array.length;i++){//order_a?
                    let num=i;//order_array[i];//order_a?
                    if(debi("mov-"+num)){
                    }
                    else{
                        debi("b-"+num).style.backgroundColor="hsla("+button_array[num].color+",0%,75%,1.00)";
                        debi("b-"+num).style.border="2px solid hsla("+button_array[num].color+",0%,50%,1.00)";
                        debi("bnn-"+num).className="b_number_off";
                        debi("bnn-"+num).style.color="hsla("+button_array[num].color+",0%,100%,1.00)";//white
                        debi("bti-"+num).innerHTML="";
                        debi("bt-"+num).innerHTML="";
                        debi("bdn-"+num).innerHTML="";
                        debi("bdn-"+num).innerHTML="";//white
                        debi("movie-"+num).innerHTML="";    
                    }
                }
                colorb_c=0;
            }
        }
        else{
        }
    }
    else if(e.target.id.indexOf("b-")>=0){
        e.stopPropagation();
        e.preventDefault();
    
    }
    else{
    }
});

var fade_on=0;
function f_b_click(){
    if(fade_on==0){
		debi("f_b").style.color="hsla(0,0%,50%,1.00)";
		debi("f_b_div").style.backgroundColor="hsla(57,100%,79%,1.00)";
		fade_on=1;
    }
    else{
        fade_on=0;
        debi("f_b").style.color="hsla(208,100%,97%,1.00)";
        debi("f_b_div").style.backgroundColor="hsla(0,0%,67%,1.00)";
    }
}
	
var flick_on=0;
function f_b_flick(){
	if(flick_on==0){
		debi("f_b").style.color="hsla(208,100%,97%,1.00)";
		debi("f_b_div").style.backgroundColor="hsla(0,0%,78%,1.00)";
		flick_on=1;
	}
	else{
		debi("f_b").style.color="hsla(0,0%,50%,1.00)";
		debi("f_b_div").style.backgroundColor="hsla(57,100%,79%,1.00)";
		flick_on=0;
	}   
}
