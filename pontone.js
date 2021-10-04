/*PonTONE v1.1.4*/

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
					//check_line+='<input type="radio" name="c_pattern" id="radio_'+bg_num+'">'
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
	//console.log(b_pattern_array)
	debi("choice_lay").style.width=(((((6*6))+(28*6))+30)*2+(24*2))+"px";
	debi("choice_lay").style.height=(((6*(24/6)+12)+(28*(24/6)))*2+((6*(12/6)+12)+(28*(12/6)))+((6*(6/6)+12)+(28*(6/6)))+(36*4))+"px";
    debi("choice_lay").innerHTML='<div>click bottons pattern</div>';
    debi("choice_lay").innerHTML+='<div id="choice_row" class="choice_row_div"></div>';
	for(let i=0;i<b_pattern_array.length;i++){
		let b_num=Number(b_pattern_array[i].split("\t")[0]);
		let line_num=Number(b_pattern_array[i].split("\t")[1]);
		//console.log("b_num="+b_num+" line_num="+line_num);
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
		confirm_line+='<span>';
			confirm_line+="Your Choice";
		confirm_line+='</span>';
		let c_pattern=b_pattern_array[num].split("\t")[2].replace(/\"bg-/,"\"bgc-");
		c_pattern=c_pattern.replace(/\"cd-/,"\"cdc-");
		confirm_line+=c_pattern;
		confirm_line+='<span>';
			confirm_line+='<input type="button" id="b_return" class="size_13" value="Return" onClick="choice_return('+num+')">';
			confirm_line+='<span>　　　</span>';
			confirm_line+='<input type="button" id="b_ok" class="size_13" value="O K" onClick="choice_ok('+Number(b_pattern_array[num].split("\t")[0])+','+Number(b_pattern_array[num].split("\t")[1])+')">';
		confirm_line+='</span>';
	confirm_line+='</div>';
	debi("confirm_lay").innerHTML=confirm_line;
	debi("confirm_background").style.display='flex';
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

function choice_return(num){
	debi("confirm_lay").innerHTML="";
	debi("confirm_lay").style.display='none';
	debi("confirm_background").style.display='none';
}

function choice_ok(num1,num2){
	debi("confirm_lay").innerHTML="";
	debi("confirm_lay").style.display='none';
	debi("confirm_background").style.display='none';
	debi("choice_lay").style.display="none";
	make_buttons(num1,num2);
}

/*buttons object default*/
function myButton(){//button object
	this.color=180;
    this.on=0;
    this.fading=0;
	this.data=""
    this.url="";
    this.timer;
}

/*set-up buttons*/
var button_array=[];
var sub_win;
var window_options = "menubar=no,location=yes,resizable=yes,scrollbars=no,status=no";
function make_buttons(num1,num2){//num1=all,num2=lines
	debi("tytle").style.display="block";
	debi("fader_qy").value=debi("fader").value=0;
    for(let i=0;i<num1;i++){
		button_array.push(new myButton());
		let step=360/num1;
        button_array[i].color=180-step*i;
		let buttons_line='<div id="b-'+i+'" class="button">';
                buttons_line+='<div id="movie-'+i+'" class="mv_div">';
				//buttons_line+='<video id="mov-'+i+'" height="0px" width="0px"></video>';
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
                buttons_line+='<p><span id="bdn-'+i+'" class="d_name">';//<p></p> v1.0.1 fixed
                buttons_line+='</span></p>';
            buttons_line+='</div>';        
            buttons_line+='<div id="bld-'+i+'" class="b_lay">';
            buttons_line+='</div>';
		buttons_line+='</div>';
		debi("button_background").innerHTML+=buttons_line;
		debi("bnn-"+i).style.color="hsla("+button_array[i].color+",0%,100%,1.00)";//white
		debi("bti-"+i).style.color="hsla("+button_array[i].color+",0%,100%,1.00)";//white
		debi("bt-"+i).style.color="hsla("+button_array[i].color+",0%,100%,1.00)";//white
		debi("bdn-"+i).style.color="hsla("+button_array[i].color+",0%,100%,1.00)";//white
		debi("bdn-"+i).style.fontWeight="bold";
        debi("button_background").style.width=(num2*100+num2*20)+"px";
		debi("button_background").style.height=((num1/num2)*100+(num1/num2)*20)+"px";
    }
	//sub_win=open("movie.html","Display Window",window_options);
}

/*assign*/
function assign_data(num){//index_number
    //console.log("assign_data()")
    debi("movie-"+num).innerHTML='<video id="mov-'+num+'" height="0px" width="0px"></video>';
    debi("mov-"+num).src=button_array[num].url;
    debi("mov-"+num).addEventListener("loadedmetadata", ()=>{
        debi("bt-"+num).innerHTML=data_duration(debi("mov-"+num).duration); 
    });
    let hue_num=button_array[num].color;
    debi("b-"+num).style.backgroundColor="hsla("+hue_num+",70%,50%,0.60)";
    debi("b-"+num).style.borderTop="0px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderLeft="0px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderBottom="4px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("b-"+num).style.borderRight="4px solid "+"hsla("+hue_num+",90%,35%,0.80)";
    debi("bnn-"+num).className="b_number_on";
    debi("bnn-"+num).style.color="hsla("+hue_num+",90%,35%,0.80)";
    debi("bti-"+num).innerHTML="";
    debi("btd-"+num).style.backgroundColor="hsla("+hue_num+",75%,45%,0.40)";
    debi("bdn-"+num).style.color="hsla(0,0%,100%,1.00)";
    debi("bld-"+num).style.backgroundColor="hsla(0,0%,100%,0.00)";
    debi("bld-"+num).innerHTML="";
}

/*dataTransfer.files drag & drop*/
document.onmouseover=mouse_over;
function mouse_over(e){
	if(e.target.id.indexOf("bld-")>=0){
        //console.log("onmauseover "+e.target.id);
	}
    /*else{
        return false;
    }*/
}

document.ondragenter=drag_enter;
function drag_enter(e){
	if(e.target.id.indexOf("bld-")>=0){
        //console.log("ondragenter "+e.target.id);
        e.stopPropagation();
        e.preventDefault();
	}
    else{
        return false;
    }
}

document.ondragover=drag_over;
function drag_over(e){
	if(e.target.id.indexOf("bld-")>=0){
        //console.log("ondragover "+e.target.id);
        e.stopPropagation();
        e.preventDefault();
	}
    else{
        return false;
    }
}
document.ondrop=drop;
function drop(e){
	if(e.target.id.indexOf("bld-")>=0){
        console.log("drop "+e.target.id);
		file_id=e.target.id;
		let drop_func=()=>{
			const drop_files = e.dataTransfer.files;
			if(drop_files[0].type.indexOf("audio")>=0){
				debi("bdn-"+file_id.split("-")[1]).innerHTML=drop_files[0].name;
				button_array[Number(file_id.split("-")[1])].name=drop_files[0].name;
				button_array[Number(file_id.split("-")[1])].data= drop_files[0].type; 
				let create=URL.createObjectURL(drop_files[0]);// faster than readAsDataURL()
				//let create=debi("selected_data").files[0];//waiting for srcObject depend on browser
				//button_array[Number(file_id.split("-")[1])].data= create;
                button_array[Number(file_id.split("-")[1])].url=create;
                assign_data(Number(file_id.split("-")[1]));
            }
			else{
				alert("Sorry no sound data");
			}
		}
        e.stopPropagation();
        e.preventDefault();
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
        //console.log("out of frame");
        return false;
    }
}

var file_id="";
document.oncontextmenu =(e)=>{//right click safari ???
        //console.log(e.target.id);
    if(e.target.id){
        if(e.target.id.indexOf("bld-")>=0){
			file_id=e.target.id;
            if(debi("movie-"+e.target.id.split("-")[1]).innerHTML==""){
				debi("selected_data").click();// onchange="link_data()"
			}
            else{
                if(debi("mov-"+e.target.id.split("-")[1]).paused){
					let confirm_line='<div class="confirm_lay_div">';
                    confirm_line+='<span>';
                       confirm_line+=debi("bdn-"+e.target.id.split("-")[1]).innerHTML;
                    confirm_line+='</span>';
                    confirm_line+='<span class="confirm_div_button">';
                        confirm_line+='<input type="button" id="b_change" class="size_13" value="Change" onClick="change_data()">';
                        confirm_line+='<span>　or　</span>';
                        confirm_line+='<input type="button" id="b_delete" class="size_13" value="Delete" onClick="delete_data('+Number(e.target.id.split("-")[1])+')">';
                    confirm_line+='</span>';
                    confirm_line+='<span>';
                        confirm_line+='<input type="button" id="b_cancel" class="size_13" value="CANCEL" onClick="cancel_data()">';
                    confirm_line+='</div>';
                    debi("confirm_lay").innerHTML=confirm_line;
                    debi("confirm_background").style.display='flex';
                    debi("confirm_lay").style.display='block';
                    return false;
                }
                else{
                    return false;
                }
            }
        }
        else{
            return false;
        }
    }
    return false;
};

function link_data(){
    //console.log("link_data()");
	if(debi("selected_data").files[0].type.indexOf("audio")>=0){
        debi("bdn-"+file_id.split("-")[1]).innerHTML=debi("selected_data").files[0].name;
        button_array[Number(file_id.split("-")[1])].name=debi("selected_data").files[0].name;
		button_array[Number(file_id.split("-")[1])].data= debi("selected_data").files[0].type;
    	let create=URL.createObjectURL(debi("selected_data").files[0]);// faster than readAsDataURL()
		//let create=debi("selected_data").files[0];//waiting for srcObject depend on browser
		//button_array[Number(file_id.split("-")[1])].data= create; 
		debi("movie-"+file_id.split("-")[1]).innerHTML='<video id="mov-'+file_id.split("-")[1]+'" height="0px" width="0px"></video>';
		debi("mov-"+file_id.split("-")[1]).src=create;
		button_array[Number(file_id.split("-")[1])].url=create;
        assign_data(Number(file_id.split("-")[1]));
        debi("selected_data").value="";
	}
	else{
		alert("Sorry no sound data");
	}
	debi("confirm_background").style.display='none';
	debi("confirm_lay").style.display='none';
 }

/*button pad click*/
var array_num=-1;
var waiting_num=-1;
document.addEventListener('click', (e)=>{
	//console.log("click= "+e.target.id);
	if(e.target.id){
		if(e.target.id.indexOf("bld-")>=0){
            if(debi("movie-"+e.target.id.split("-")[1]).innerHTML!=""){
                if(debi("mov-"+e.target.id.split("-")[1]).paused){
                    waiting_num=Number(e.target.id.split("-")[1]);
                    let on_check=0;
                    for(let i=0;i<button_array.length;i++){
                        if(button_array[i].on==1){
                            if(button_array[i].data.indexOf("audio")>=0){
                                on_check=1;
                                if(button_array[i].fading==0){
                                    stop_playing(i); 
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
                                //open("movie.html","Display Window",window_options);
                                //window.focus();
                            }
                            break;
                        }
                    }
                    if(on_check==0){    
                        start_to_play(waiting_num,0);
                    }
                }
                else{
					array_num=Number(e.target.id.split("-")[1]);
					if(button_array[array_num].data.split(",")[0].indexOf("audio")>=0){
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
	}
});

/*space key event*/
document.onkeydown=key_down; //ページ
function key_down(event){//
    if(event.key==" " || event.key=="　"){//
		for(let i=0;i<button_array.length;i++){
			if(button_array[i].on==1){
				if(button_array[i].data.indexOf("audio")>=0){
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

function t_ing(num){//time progress
    let running=debi("mov-"+num).currentTime;
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
    if(fade_on==1 && debi("fader").value!=0){
        fo_time=debi("fader").value;
        //console.log("fading stop");
        button_array[num].fading=1;
        debi("bld-"+num).style.backgroundColor="hsla("+button_array[num].color+",50%,50%,0.30)";
        //sound_fading(num)
    }
    else{
        //console.log("normal stop");
        to_end(num);
    }
}   

function to_end(num){
    //console.log("to_end num="+num);
    clearInterval(button_array[num].timer)//function name
    //console.log("clear button_array[num].timer-ID="+button_array[num].timer);
    debi("mov-"+num).pause();
    debi("mov-"+num).currentTime = 0;
    debi("mov-"+num).volume = 1;
    if(fade_on==1){
        clearInterval(flick);
        console.log("clear flick-ID="+flick);
        fade_on=0;
        debi("f_b").style.color="hsla(208,100%,97%,1.00)";
        debi("f_b_div").style.backgroundColor="hsla(0,0%,67%,1.00)";
    }
    //if(waiting_num>=0){
        //start_to_play(waiting_num);
    //}
    assign_data(num);
    button_array[num].on=0;
}

/*sound fade out*/
var out_time=0;
function sound_fade_out(num){
    out_time+=0.1;
    if(fo_time<=out_time){
		debi("bld-"+num).style.backgroundColor="hsla("+button_array[num].color+",0%,100%,0.00)";
		debi("mov-"+num).volume=0;
		button_array[num].fading=0;
        debi("bld-"+num).innerHTML="";
        out_time=0;
        to_end(num); 
    }
    else if(out_time<fo_time/2){
        debi("mov-"+num).volume=-(1/(fo_time*2))*out_time+1;
        //console.log("debi(mov-+num).volume="+debi("mov-"+num).volume);
        if(out_time.toFixed(1)*10%2==1){
			if(debi("bld-"+num).innerHTML==""){
                debi("bld-"+num).innerHTML='<span style="font-size:28pt; font-weight:bold; transform: scale(1, 1.25); color:hsla(0,0%,100%,1.00);">OUT</span>';
			}
            else{
				debi("bld-"+num).innerHTML="";
            }
        }
    }
    else{
        debi("mov-"+num).volume=-(1/fo_time)*(3/2)*out_time+1.5;
        //console.log("debi(mov-+num).volume="+debi("mov-"+num).volume);
        if(out_time.toFixed(1)*10%2==1){
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
        //console.log("ended in !");
        to_end(num);
    });
    if(fade==1 && debi("fader").value!=0){//引数を受けている not fade_on
        debi("mov-"+num).volume=0;//
		fi_time=debi("fader").value;
        button_array[num].fading=2;
        debi("bld-"+num).style.backgroundColor="hsla("+button_array[num].color+",50%,50%,0.30)";
    }
    if(button_array[num].data.indexOf("audio")>=0){
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
    debi("bnn-"+num).style.color="hsla("+hue_num+",90%,35%,0.30)";
    //debi("btd-"+num).style.backgroundColor="hsla("+hue_num+",75%,45%,0.40)";//no change
    //debi("btd-"+num).style.fontWeight="bold";
    debi("bdn-"+num).style.color="hsla("+hue_num+",90%,35%,0.80)";
    waiting_num=-1;
}   

/*sound fade in*/
var in_time=0;
function sound_fade_in(num){
    //debi("mov-"+num).volume=0;
    in_time+=0.1;
    if(fi_time<=in_time){
        debi("bld-"+num).style.backgroundColor="hsla("+button_array[num].color+",0%,100%,0.00)";
        debi("mov-"+num).volume=1;
        button_array[num].fading=0;
        debi("bld-"+num).innerHTML="";
        in_time=0;
    }
    else if(in_time<fi_time/2){
        debi("mov-"+num).volume=(1/fo_time)*(3/2)*out_time;
        //console.log("debi(mov-+num).volume="+debi("mov-"+num).volume);
        if(in_time.toFixed(1)*10%2==1){
            if(debi("bld-"+num).innerHTML==""){
                debi("bld-"+num).innerHTML='<span style="font-size:28pt;  font-weight:bold;transform: scale(1, 1.25); color:hsla(0,0%,100%,1.00);">IN</span>';
            }
            else{
                debi("bld-"+num).innerHTML="";
            }
        }
    }
    else{
        debi("mov-"+num).volume=(1/(fo_time*2))*out_time+0.5;
        //console.log("debi(mov-+num).volume="+debi("mov-"+num).volume);
        if(in_time.toFixed(1)*10%2==1){
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

/*right click confirm*/
function change_data(){
	debi("selected_data").click();
}

function cancel_data(){
	debi("confirm_background").style.display='none';
	debi("confirm_lay").style.display='none';	
}

function delete_data(num){
	debi("b-"+num).style.backgroundColor="hsla("+button_array[num].color+",0%,75%,1.00)";
    debi("b-"+num).style.border="2px solid hsla("+button_array[num].color+",0%,50%,1.00)";
    debi("bnn-"+num).className="b_number_off";
    debi("bnn-"+num).style.color="hsla("+button_array[num].color+",0%,100%,1.00)";//white
    debi("bt-"+num).innerHTML="";
    debi("bdn-"+num).innerHTML="";
    debi("bdn-"+num).innerHTML="";//white
    debi("movie-"+num).innerHTML="";
    button_array[num].name="";
    button_array[num].data="";
    button_array[num].url="";
    
	debi("confirm_background").style.display='none';
	debi("confirm_lay").style.display='none';
}

/*tool_var*/
var x=0;
var y=0;
let drag_ele;
function drag_move(e){
    //console.log("mousemove= "+e.target.id);
    drag_ele.style.top = e.pageY - y + "px";
    drag_ele.style.left = e.pageX - x + "px";
    drag_ele.addEventListener("mouseup", drop_mup, false);
    document.addEventListener("mouseleave", drop_mup, false);
    return false;
}

function drop_mup(e){
    document.removeEventListener("mousemove", drag_move, false);
    drag_ele.removeEventListener("mouseup", drop_mup, false);
}

document.addEventListener("mousedown", (e)=>{//fader_div
    //console.log("e.target.id="+e.target.id);
	if(e.target.id=="tool_var" || e.target.id=="fader_div" || e.target.id=="FT" || e.target.id=="fader_qy"){
        drag_ele = debi("tool_var");
        x = e.pageX - drag_ele.offsetLeft;
        y = e.pageY - drag_ele.offsetTop;
        console.log("x="+x+" y="+y);
        document.addEventListener("mousemove", drag_move, false);
    }
    return false;
});

function slide_fr(){
    debi("fader_qy").innerHTML=Number(debi("fader").value).toFixed(1);
}

function close_tv(){
    if(fade_on==1){
        clearInterval(flick);
        console.log("clear flick-ID="+flick);
        fade_on=0;
        debi("f_b").style.color="hsla(208,100%,97%,1.00)";
        debi("f_b_div").style.backgroundColor="hsla(0,0%,67%,1.00)";
    }
    debi("tool_var").style.display="none";
}

document.addEventListener('dblclick', (e)=>{
	console.log("dblclickclick= "+e.target.id);
	if(e.target.id){
		if(e.target.id=="main" || e.target.id=="tytle_var"){
            if(debi("tool_var").style.display=="none"){
                debi("tool_var").style.display="flex";
            }
            else{
                debi("tool_var").style.display="none";
                if(fade_on==1){
                    clearInterval(flick);
                    console.log("clear flick-ID="+flick);
                    fade_on=0;
                    debi("f_b").style.color="hsla(208,100%,97%,1.00)";
                    debi("f_b_div").style.backgroundColor="hsla(0,0%,67%,1.00)";
                }
            }
        }
    }
    return false;
});

var flick;    
var fade_on=0;
function f_b_click(){
    let flick_on=0
    if(fade_on==0){
		debi("f_b").style.color="hsla(0,0%,50%,1.00)";
		debi("f_b_div").style.backgroundColor="hsla(57,100%,79%,1.00)";
		flick_on=1;
        flick=setInterval(()=>{
            fade_on=1;
            if(flick_on==0){//
                debi("f_b").style.color="hsla(0,0%,50%,1.00)";
                debi("f_b_div").style.backgroundColor="hsla(57,100%,79%,1.00)";
                flick_on=1;
            }
            else{
                debi("f_b").style.color="hsla(208,100%,97%,1.00)";
                debi("f_b_div").style.backgroundColor="hsla(0,0%,78%,1.00)";
                flick_on=0;
            }   
        },400);
    }
    else{
        clearInterval(flick);
        //console.log("clear flick-ID="+flick);
        fade_on=0;
        debi("f_b").style.color="hsla(208,100%,97%,1.00)";
        debi("f_b_div").style.backgroundColor="hsla(0,0%,67%,1.00)";
    }
}