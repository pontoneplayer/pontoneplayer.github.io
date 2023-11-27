/*PonTONE v1.3.4*/

function debi(id){
	return document.getElementById(id);
}

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
    let open_confirm=()=>{
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
    clearTimeout(timer);
   }
    let timer=setTimeout(open_confirm,150);
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
    this.volume=0.75;//%
	this.cue=1;
	this.loop=false;
    this.begining=0;
    this.content="";
    this.order;
    this.start=0;
}

/*set-up buttons*/
var button_array=[];
var order_array=[];
var dummy_button="";
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
                buttons_line+='<div id="movie-'+i+'" class="mv_div">';
                buttons_line+='</div>';
                buttons_line+='<div id="bnd-'+i+'" class="bn_div">';
                    buttons_line+='<span id="bnn-'+i+'" class="b_number_off">';
                    if(i<9){
                        buttons_line+='0'+(i+1);
                    }
                    else{
                        buttons_line+=(i+1);
                    }
                buttons_line+='</span>';
            buttons_line+='</div>';
            buttons_line+='<div id="btd-'+i+'" class="bt_div">';
                buttons_line+='<span id="bti-'+i+'" class="b_time_ing">';
                buttons_line+='</span>';
                buttons_line+='<span id="bt-'+i+'" class="b_time">';
                buttons_line+='</span>';
            buttons_line+='</div>';
            buttons_line+='<div id="bdd-'+i+'" class="bd_div">';
                buttons_line+='<span id="bdn-'+i+'" class="d_name">';//<p></p> v1.0.1 fixed
                buttons_line+='</span>';
            buttons_line+='</div>';        
            buttons_line+='<div id="bld-'+i+'" class="b_lay">';
            buttons_line+='</div>';
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
    debi("button_background").innerHTML+='<div id="dummy" class="button">';
    debi("button_background").innerHTML+='</div>'
    debi("dummy").style.display="none";
    //debi("dummy").style.visibility="hidden";
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
        debi("bt-"+num).innerHTML=data_duration(debi("mov-"+num).duration-Math.floor(button_array[num].start)); 
    debi("mov-"+num).currentTime=button_array[num].start;
    console.log('debi("mov-"+num).currentTime='+debi("mov-"+num).currentTime);
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

/*dataTransfer.files drag & drop*/
let check_t_bar;
document.addEventListener("mousedown", (e)=>{//fader_div
	if(e.target.id.indexOf("bld-")>=0){
        //console.log("mousedown e.target.id="+e.target.id);
        let num=Number(e.target.id.split("-")[1]);
        if(debi("mov-"+num)){
            if(debi("mov-"+num).paused){
                debi("b-"+num).draggable=true;
                //console.log('mousedown  debi("b-'+num+'").draggable='+debi("b-"+num).draggable);
            }
        }
	}
    else{
        check_t_bar=e.target.id;
    }
});

var x=0;
var y=0;
function button_trans(num){
    /*debi("dummy").style.display="flex";
    debi("dummy").style.order=button_array[num].order;
    debi("dummy").style.visibility="hidden";
    debi("b-"+num).style.position="absolute";
    debi("b-"+num).style.zIndex=5;
    debi("b-"+num).style.left=debi("dummy").offsetLeft+"px";
    debi("b-"+num).style.top=debi("dummy").offsetTop+"px";*/
}

var drag_ele="";
document.ondragstart=drag_start; 
function drag_start(e){// only on browser
    let num=Number(e.target.id.split("-")[1]);
    if(e.target.id=="tool_bar"){
        if(check_t_bar!="close_x" && check_t_bar!="master" && check_t_bar!="f_b" && check_t_bar!="fader"){
            drag_ele = debi("tool_bar");
            x = e.pageX - drag_ele.offsetLeft;
            y = e.pageY - drag_ele.offsetTop;
        }
        else{
            e.stopPropagation();
            e.preventDefault();
        }
    }
    else if(e.target.id.indexOf("b-")>=0){
        console.log("ondragstart e.target.id="+e.target.id);
        drag_ele = debi("b-"+num);
		debi("dummy").style.display="flex";
		debi("dummy").style.order=button_array[num].order;
		debi("dummy").style.visibility="hidden";
		debi("b-"+num).style.position="absolute";
		debi("b-"+num).style.zIndex=5;
		debi("b-"+num).style.left=debi("dummy").offsetLeft+"px";
        debi("x_p").innerHTML=debi("dummy").offsetLeft;
		debi("b-"+num).style.top=debi("dummy").offsetTop+"px";
        debi("y_p").innerHTML=debi("dummy").offsetTop;
    }
    else{
    }
}

document.onmouseover=mouse_over
function mouse_over(e){
    e.stopPropagation();
    e.preventDefault();
}

document.ondragenter=drag_enter;
function drag_enter(e){
    e.stopPropagation();
    e.preventDefault();
}

//document.ondrag=drag_move;//FireFox not yet
document.ondragover=drag_move;
function drag_move(e){
    if(drag_ele!=""){
        if(drag_ele.id=="tool_bar"){
             drag_ele.style.visibility="hidden";
        }
        else if(drag_ele.id.indexOf("b-")>=0){
			if(e.target.id.indexOf("bld-")>=0 || e.target.id==debi("button_background")){
        //debi("x_p").innerHTML=e.pageX - debi("button_background").offsetLeft;
        //debi("y_p").innerHTML=e.pageY - debi("button_background").offsetTop;
				let num=Number(drag_ele.id.split("-")[1]);
                debi("b-"+num).style.visibility="hidden";
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
					if(e.pageX - debi("button_background").offsetLeft>=0 && e.pageX -   debi("button_background").offsetLeft<=l_p){
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
					if(e.pageY - debi("button_background").offsetTop>=0 && e.pageY - debi("button_background").offsetTop<=t_p){
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
					//console.log(order_array);
				}
			}
		}
    }
    //else{
    //}
    e.stopPropagation();
	e.preventDefault();
}

document.ondrop=drop;
function drop(e){
    console.log("drop drag_ele.id="+drag_ele.id);
    if(drag_ele!=""){
        if(drag_ele.id=="tool_bar"){
            drag_ele.style.top = e.pageY - y + "px";
            drag_ele.style.left = e.pageX - x + "px";
            drag_ele.style.visibility="visible";
            console.log("e.target.id="+e.target.id);
        }
        else if(drag_ele.id.indexOf("b-")>=0){
            drop_mup(e);
        }
    }
    else{
        if(e.target.id.indexOf("bld-")>=0){
            file_id=e.target.id;
            let drop_func=()=>{
                const drop_files = e.dataTransfer.files;//array
                if(drop_files){
					let num=Number(file_id.split("-")[1]);
					let alert_count=0;
                    let o_c=button_array[num].order;//order_count
                    let repeat_count;
                    if((order_array.length-o_c)>=drop_files.length){
                        assign_count=repeat_count=drop_files.length;
                        //console.log("if video_check_count="+video_check_count);
                    }
                    else{
                        assign_count=repeat_count=order_array.length-o_c;
                        //console.log("else video_check_count="+video_check_count);
                    }
                    seek_alert_on();
					for(let i=0;i<repeat_count;i++){
                        if(drop_files[i]){
                            if(drop_files[i].type.indexOf("audio")>=0){
                                let create=URL.createObjectURL(drop_files[i]);// faster than readAsDataURL()                                //let o_c=button_array[num].order+i;
                                if(button_array[order_array[o_c]]){
                                    console.log("o_c="+o_c);
                                    button_array[order_array[o_c]].name=drop_files[i].name;
                                    button_array[order_array[o_c]].type= drop_files[i].type; 
                                    //button_array[order_array[o_c]].data= drop_files[i]; 

                                    //let create=drop_files[0];//waiting for srcObject depend on browser
                                    //button_array[Number(file_id.split("-")[1])].data= create;
                                    button_array[order_array[o_c]].url=create;
                                    button_array[order_array[o_c]].loop=false;
                                    //button_array[order_array[o_c]].begining=0;
                                    seek_nosound_time(o_c,drop_files[i]);
                                }
                                o_c++;
                            }
                            else{
                                alert_count++;
                            }
                        }
                    }
					if(alert_count==1){
						alert("Sorry "+alert_count+" file no sound data");
					}
					else if(alert_count>1){
						alert("Sorry "+alert_count+" files no sound data");
					}
                }   
                else{
                    alert("Sorry no data");
                    //e.stopPropagation();
                    //e.preventDefault();
                }
            }
            if(debi("movie-"+e.target.id.split("-")[1]).innerHTML==""){
                drop_func();
            }
            else{
                if(debi("mov-"+e.target.id.split("-")[1]).paused){
                    drop_func();
                }
            }
        }
        else{
            //e.stopPropagation();
            //e.preventDefault();
        }
    }
    e.stopPropagation();
    e.preventDefault();
    drag_ele="";
}

function drop_mup(e){
	let num=Number(drag_ele.id.split("-")[1]);
    debi("b-"+num).style.zIndex=0;
	debi("b-"+num).style.position="relative";

    debi("b-"+num).style.left="0px";//debi("dummy").offsetLeft+"px";
    debi("b-"+num).style.top="0px";//debi("dummy").offsetTop+"px";
    debi("b-"+num).style.visibility="visible";
    debi("dummy").style.display="none";
    for(let i=0;i<button_array.length;i++){
        let order_num;
        if(button_array[i].order<9){
            order_num='0'+(button_array[i].order+1);
        }    
        else{
            order_num=button_array[i].order+1;
        }
        debi("bnn-"+i).innerHTML=order_num;
        button_array[i].content=debi("b-"+i).innerHTML;
    }
}

/*right click confirm*/
var assign_count=0;
function link_data(){
    const select_files = debi("selected_data").files;
    if(select_files){
        let num=Number(file_id.split("-")[1]);
        let alert_count=0;
        let o_c=button_array[num].order;//order_count
        let repeat_count;
        if((order_array.length-o_c)>=select_files.length){
            assign_count=repeat_count=select_files.length;
        }
        else{
            assign_count=repeat_count=order_array.length-o_c;
        }
        seek_alert_on();
        for (let i=0;i<repeat_count;i++){
            if(select_files[i]){
                if(select_files[i].type.indexOf("audio")>=0){
                    if(button_array[order_array[o_c]]){
                        console.log("o_c="+o_c);
                        button_array[order_array[o_c]].name=select_files[i].name;
                        button_array[order_array[o_c]].type=select_files[i].type;
                        //button_array[order_array[o_c]].data=select_files[0];
                        let create=URL.createObjectURL(select_files[i]);// faster than readAsDataURL()
                        //let create=debi("selected_data").files[0];//waiting for srcObject depend on browser
                        button_array[order_array[o_c]].url=create;
                        button_array[order_array[o_c]].loop=false;
                        
                        seek_nosound_time(o_c,select_files[i]);
                    }
                    o_c++;
                }
                else{
                    alert_count++;
                }
            }
        }
        debi("selected_data").value="";
        if(alert_count==1){
            alert("Sorry "+alert_count+" file no sound data");
        }
        else if(alert_count>1){
            alert("Sorry "+alert_count+" files no sound data");
        }
    }
	else{
		alert("Sorry no data");
	}
	debi("right_click_background").style.display='none';
	debi("right_click_lay").style.display='none';
}

function seek_alert_on(){
    let seeking_line='<div class="seek_lay_div">';
    seeking_line+='<span style="color:hsla(0,0%,45%,1.00)">';
    //seeking_line+='adjusting cue timing of sounds';
    /*if(window.navigator.userAgent.toLowerCase().indexOf("safari")>=0 && window.navigator.userAgent.toLowerCase().indexOf("version")>=0){
        //s_d_array_count=video_check_count;//video_check_count
        seeking_line+='safari do not adjust cue timing of sounds';
    }
    else{*/
        //assign_count=video_check_count;
        seeking_line+='adjusting cue timing of sounds';
    //}
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

function seek_nosound_time(o_c,select_file){
	let source;
	let animationId;
	let audioContext = new AudioContext();
	//let audioContext = new OfflineAudioContext()
	let fileReader   = new FileReader();
	let gainNode = audioContext.createGain();                        
	let analyser = audioContext.createAnalyser();
	analyser.fftSize = 128;
	analyser.connect(gainNode).connect(audioContext.destination);
	gainNode.gain.value=0;
	debi("visualizer").innerHTML+='<canvas id="can_'+o_c+'" class="canvas_css"></canvas>';//
	let canvas = document.getElementById("can_"+o_c);
	//console.log("canvas="+canvas);
	let canvasContext = canvas.getContext('2d');//2d描写の時に必ずいる
	canvas.width=analyser.frequencyBinCount * 10;
	//console.log("canvas.width="+canvas.width);
	fileReader.readAsArrayBuffer(select_file);
	let conti_stop=0;
	//let frame_count=0;
	let seek_start;
	let seek_end=0;
	let render = (timestamp)=>{
	//console.log("analyser.frequencyBinCount="+analyser.frequencyBinCount);
		if(seek_start===undefined){
			seek_start=timestamp;
			//console.log("seek_start="+seek_start);
		}
		let spectrums = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(spectrums);
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
		for(let j=0, len=spectrums.length; j<len; j++){
			canvasContext.fillRect(j*10, 0, 5, spectrums[j]);
			if(spectrums[j]>5){
				conti_stop++;
				break;
			}
		}
		if(conti_stop==0){
			//timestamp+=timestamp;
			//console.log("spectrums="+spectrums);
			//frame_count++;
			animationId = requestAnimationFrame(render);
		}
		else{
			//console.log("spectrums="+spectrums);
			source.stop();
			cancelAnimationFrame(animationId);
			seek_end=timestamp;
			//console.log("seek_end="+seek_end);
			let jikan_sa=seek_end-seek_start;//sound_in_time
			console.log("o_c="+o_c+" jikan_sa="+jikan_sa);
			if(jikan_sa<200){
				button_array[order_array[o_c]].start=0;
			}
			else{
				let start_jikan=jikan_sa%200;
				if(start_jikan<100){
					start_jikan+=100;
				}
				//console.log("start_jikan/1000="+start_jikan/1000);
				button_array[order_array[o_c]].start=start_jikan/1000;
			}
			assign_count--;
			//console.log("assign_count="+assign_count);
			assign_data(order_array[o_c]);
			if(assign_count==0){
				debi("visualizer").innerHTML="";	
				seek_alert_off();
			}
		}
	};
                    
	fileReader.onload = ()=>{
		audioContext.decodeAudioData(fileReader.result, function(buffer){
			if(source) {
				source.stop();
				cancelAnimationFrame(animationId);
			}
			source = audioContext.createBufferSource();
			source.buffer = buffer;
			source.connect(analyser);
			source.start(0);//原曲をシークするので0;
			//frame_count++;
			animationId = requestAnimationFrame(render);
		});
	};
}

var file_id="";
var con_x;//config
var con_y;
document.oncontextmenu =(e)=>{//right click safari ???
    if(e.target.id){
        if(e.target.id.indexOf("bld-")>=0){
			file_id=e.target.id;
			let num=Number(e.target.id.split("-")[1]);
            if(debi("movie-"+e.target.id.split("-")[1]).innerHTML==""){
                if(window.navigator.userAgent.toLowerCase().indexOf("safari")>=0 && window.navigator.userAgent.toLowerCase().indexOf("version")>=0){
                    //console.log(window.navigator.userAgent.toLowerCase());
                    alert('sorry safari assigns by only drag & drop');
                }
                else{
                    debi("selected_data").click();// onchange="link_data()"
                }
                return false;
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
				//clearTimeout(long_down);
				//console.log("clearTimeout-ID="+long_down);
                trans_check=0;
				console.log("never go to button_trans");
				//console.log("trans_check="+trans_check);
				return false;
            }
        }
        else{
            //clearTimeout(long_down);
            //console.log("clearTimeout-ID="+long_down);
            trans_check=0;
            console.log("trans_check="+trans_check);
            return false;
        }
    }
    //clearTimeout(long_down);
    //console.log("clearTimeout-ID="+long_down);
    trans_check=0;
    return false;
};

function slide_each(num){
	button_array[num].volume=Number(debi("each").value)/10;
    debi("each_qty").innerHTML=Number(debi("each").value).toFixed(1);
        if(button_array[num].type.indexOf("audio")>=0){
            debi("mov-"+num).volume = button_array[num].volume*m_v/10;
            button_array[num].content=debi("b-"+num).innerHTML;
        }
        else{
            //open("movie.html","Display Window",window_options);
            //window.focus();
        }
}

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
        //debi("mov-"+num).loop=true;
    }
    else{
        button_array[num].loop=false;
        //debi("mov-"+num).loop=false;
    }
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
	debi("b-"+num).style.backgroundColor="hsla("+button_array[num].color+",0%,75%,1.00)";
    debi("b-"+num).style.border="2px solid hsla("+button_array[num].color+",0%,50%,1.00)";
    debi("bnn-"+num).className="b_number_off";
    debi("bnn-"+num).style.color="hsla("+button_array[num].color+",0%,100%,1.00)";//white
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
}

function close_r_click(){
	debi("right_click_background").style.display='none';
	debi("right_click_lay").style.display='none';	
}

/*button pad click*/
var array_num=-1
var waiting_num=-1;
let trans_check=0;
//let long_down;
document.addEventListener('click', (e)=>{
    if(e.target.id){
        if(e.target.id.indexOf("bld-")>=0){
			let num=Number(e.target.id.split("-")[1]);
            if(trans_check==0/* && get_id==e.target.id*/){	
                debi("b-"+num).draggable=false;
                //console.log('click debi("b-'+num+'").draggable='+debi("b-"+num).draggable);
                play_check(num);
                //clearTimeout(long_down);
                //console.log("clearTimeout-ID="+long_down);
                trans_check=0;
            }
            else{
                console.log("click not go to button_trans");           
            }
        }
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
 		//non assigned
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
		return false;
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
    clearInterval(button_array[num].timer)//function name
    //console.log("clear button_array[num].timer-ID="+button_array[num].timer);
    debi("mov-"+num).pause();
    if(button_array[num].cue==1){
        debi("mov-"+num).currentTime=0+button_array[num].start;
    }
    //button_array[num].loop=debi("mov-"+num).loop;
    button_array[num].begining=debi("mov-"+num).currentTime;
    button_array[num].fading=0;
    reassign(num);
    //prepare_button(num);
    button_array[num].on=0;
}

function reassign(num){//stop & reflesh
    //console.log("assign_data()")
    debi("movie-"+num).innerHTML='<video id="mov-'+num+'" height="0px" width="0px"></video>';
    debi("mov-"+num).src=button_array[num].url;
    debi("mov-"+num).addEventListener("loadedmetadata", ()=>{
        debi("bt-"+num).innerHTML=data_duration(debi("mov-"+num).duration-Math.floor(button_array[num].start)); 
    //debi("mov-"+num).loop=button_array[num].loop;
    debi("mov-"+num).currentTime=button_array[num].begining;
    button_array[num].content=debi("b-"+num).innerHTML;
    prepare_button(num);
    });
}

/*sound fade out*/
var out_time=0;
function sound_fade_out(num){
    out_time+=0.1;
    if(fo_time<=out_time){
		debi("mov-"+num).volume=0;
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
        debi("mov-"+num).volume=(-(2/Math.pow(fo_time,2)*Math.pow(out_time,2))+1)*(button_array[num].volume*m_v/10);
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
        debi("mov-"+num).volume=(2/Math.pow(fo_time,2))*Math.pow((out_time-fo_time),2)*(button_array[num].volume*m_v/10);
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

/*start to play*/
var fi_time=0;
function start_to_play(num,fade){
    debi("mov-"+num).addEventListener("ended", ()=>{//num=-1;
        console.log("ended in !");
		if(button_array[num].loop==true){
			debi("mov-"+num).currentTime=0+button_array[num].start;
			clearInterval(button_array[num].timer)//function name
			debi("mov-"+num).play();
			button_array[num].timer=setInterval(()=>{t_ing(num)},100);
		}
		else{
			console.log("ended to_end");
			to_end(num);
		}
        //debi("mov-"+num).currentTime=0+button_array[num].start;
        //to_end(num);
    });
    if(fade==1 && debi("fader").value!=0){//引数を受けている fade_on
        debi("mov-"+num).volume=0;//
		fi_time=Number(debi("fader").value);
        button_array[num].fading=2;//sound_fade_in(num);
        debi("bld-"+num).style.backgroundColor="hsla("+button_array[num].color+",50%,50%,0.30)";
    }
    if(button_array[num].type.indexOf("audio")>=0){
        debi("mov-"+num).play();
        button_array[num].on=1;
    }
    else{
        //open("movie.html","Display Window",window_options);
    }
    button_array[num].timer=setInterval(()=>{t_ing(num)},100);
    let hue_num=button_array[num].color;
    debi("b-"+num).style.backgroundColor="hsla("+hue_num+",70%,50%,0.10)";
    debi("b-"+num).style.borderTop="2px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderLeft="2px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderBottom="2px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderRight="2px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    //debi("bnn-"+num).style.filter="blur(1px)";
    debi("bnn-"+num).style.color="hsla("+hue_num+",90%,35%,0.30)";
    debi("bdn-"+num).style.color="hsla("+hue_num+",90%,35%,0.80)";
    waiting_num=-1;
}   

/*sound fade in*/
var in_time=0;
function sound_fade_in(num){
    in_time+=0.1;
    if(fi_time<=in_time){
        debi("mov-"+num).volume=button_array[num].volume*m_v/10;
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
        debi("mov-"+num).volume=(2/Math.pow(fi_time,2))*(Math.pow(in_time,2))*(button_array[num].volume*m_v/10);
        if(in_time.toFixed(1)*10%2==1){
            if(out_time==0){
               f_b_flick();
            }
            if(debi("bld-"+num).innerHTML==""){
                debi("bld-"+num).innerHTML='<span style="font-size:28pt;  font-weight:bold;transform: scale(1, 1.25); color:hsla(0,0%,100%,1.00);">IN</span>';//<span style="font-size:20px; color:hsla(0,0%,100%,1.00);">Fading</span>
            }
            else{
                debi("bld-"+num).innerHTML="";
            }
        }
    }
    else{
        debi("mov-"+num).volume=((-(2/Math.pow(fi_time,2))*Math.pow((in_time-fi_time),2))+1)*(button_array[num].volume*m_v/10);
        if(in_time.toFixed(1)*10%2==1){
            if(out_time==0){
                f_b_flick();
            }
            if(debi("bld-"+num).innerHTML==""){
                debi("bld-"+num).innerHTML='<span style="font-size:28pt;  font-weight:bold;transform: scale(1, 1.25); color:hsla(0,0%,100%,1.00);">IN</span>';//<span style="font-size:20px; color:hsla(0,0%,100%,1.00);">Fading</span>
            }
            else{
                debi("bld-"+num).innerHTML="";
            }
        }
    }
}

/*change color*/

/*eventListener*/

/*tool_bar*/
var m_v=0;//master_volume
function slide_mr(){
	m_v=Number(debi("master").value).toFixed(1);
    debi("master_qty").innerHTML=m_v;
    for(let i=0;i<button_array.length;i++){
        if(button_array[i].type.indexOf("audio")>=0){
            debi("mov-"+i).volume = button_array[i].volume*m_v/10;
        }
        else{
            //open("movie.html","Display Window",window_options);
            //window.focus();
        }
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
        /*else if(e.target.id=="close_div"){//たたみ
            if(debi("master_div").style.display=="none"){
                debi("master_div").style.display="flex";
                debi("fader_div").style.display="flex";
            }
            else{
                if(flick_on==0){
                    fade_on=0;
                    flick_on=0;
                    debi("f_b").style.color="hsla(208,100%,97%,1.00)";
                    debi("f_b_div").style.backgroundColor="hsla(0,0%,67%,1.00)";
                    debi("master_div").style.display="none";
                    debi("fader_div").style.display="none";
                }
                else{
                    return false;
                }
            }
        }*/
        else if(e.target.id=="button_background"){
            for(let i=0;i<order_array.length;i++){
                let num=order_array[i];
                let hue_num=button_array[num].color=180-(360/order_array.length)*i;
                debi("b-"+num).style.backgroundColor="hsla("+hue_num+",70%,50%,0.60)";
                debi("b-"+num).style.borderTop="0px solid "+"hsla("+hue_num+",90%,35%,0.80)";
                debi("b-"+num).style.borderLeft="0px solid "+"hsla("+hue_num+",90%,35%,0.80)";
                debi("b-"+num).style.borderBottom="4px solid "+"hsla("+hue_num+",90%,35%,0.80)";
                debi("b-"+num).style.borderRight="4px solid "+"hsla("+hue_num+",90%,35%,0.80)";
                debi("bnn-"+num).className="b_number_on";
                debi("bnn-"+num).style.color="hsla("+hue_num+",90%,35%,0.80)";
                //debi("bti-"+num).innerHTML=debi("mov-"+num).currentTime.toFixed(1)+"/";
                debi("btd-"+num).style.backgroundColor="hsla("+hue_num+",75%,45%,0.40)";
                //debi("bdn-"+num).style.color="hsla(0,0%,100%,1.00)";
                //debi("bld-"+num).style.backgroundColor="hsla(0,0%,100%,0.00)";
                //debi("bld-"+num).innerHTML="";
                //debi("mov-"+num).volume=button_array[num].volume*m_v/10
                button_array[num].content=debi("b-"+num).innerHTML;
            }
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
    return false;
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
