/*PonTONE v1.1.0*/
function debi(id){
	return document.getElementById(id);
}

var flick;    
var fade_on=0;
function f_b_click(){
    let flick_on=0
    if(fade_on==0){
		debi("f_b").style.color="rgba(127,127,127,1.00)";
		debi("f_b_div").style.backgroundColor="rgba(255,250,147,1.00)";
		flick_on=1;
        flick=setInterval(()=>{
            fade_on=1;
            if(flick_on==0){//
                debi("f_b").style.color="rgba(127,127,127,1.00)";
                debi("f_b_div").style.backgroundColor="rgba(255,250,147,1.00)";
                flick_on=1;
            }
            else{
                debi("f_b").style.color="rgba(240,248,255,1.00)";
                debi("f_b_div").style.backgroundColor="rgba(200,200,200,1.00)";
                flick_on=0;
            }   
        },400);
    }
    else{
        clearInterval(flick);
        console.log("clear flick-ID="+flick);
        fade_on=0;
        debi("f_b").style.color="rgba(240,248,255,1.00)";
        debi("f_b_div").style.backgroundColor="rgba(170,170,170,1.00)";
    }
}

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
    let qy_time;
    if(debi("fader").value.indexOf(".")<0){
        qy_time=debi("fader").value+".0";
    }
    else{
        qy_time=debi("fader").value;
        
    }
	debi("fader_qy").innerHTML=qy_time;
	//console.log(qy_time);
}
function close_tv(){
    debi("tool_var").style.display="none";
    if(fade_on==1){
        clearInterval(flick);
        console.log("clear flick-ID="+flick);
        fade_on=0;
        debi("f_b").style.color="rgba(240,248,255,1.00)";
        debi("f_b_div").style.backgroundColor="rgba(170,170,170,1.00)";
    }
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
                    debi("f_b").style.color="rgba(240,248,255,1.00)";
                    debi("f_b_div").style.backgroundColor="rgba(170,170,170,1.00)";
                }
            }
        }
    }
    return false;
});

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

function myButton(){//button object
	this.color="45,225,225,1.00";
    this.on=0;
    this.fading=0;
	this.data=""
    this.url="";
    this.timer;
}

function comp_color(getRGB){
    const aryMax = (a, b)=>{return Math.max(a, b);}
    const aryMin = (a, b)=>{return Math.min(a, b);}
    getRGB=getRGB.replace(/rgba/g,"");
	console.log("getRGB="+getRGB);
    getRGB=getRGB.replace(/\(/g,"");
    getRGB=getRGB.replace(/\)/g,"");
    let RGB_array=[];
    for(let i=0;i<getRGB.split(",").length;i++){
        RGB_array[i]=Number(getRGB.split(",")[i]);
    }
    let max = RGB_array.reduce(aryMax); // => 10
    let min = RGB_array.reduce(aryMin); // => 1}
    return "rgba("+((max+min)-RGB_array[0])+","+((max+min)-RGB_array[1])+","+((max+min)-RGB_array[2])+","+RGB_array[3]+")"
}



var button_array=[];
var sub_win;
var window_options = "menubar=no,location=yes,resizable=yes,scrollbars=no,status=no";
var db_cnt=24;//default button count //fixed v1.0.2

function make_buttons(){
	debi("fader_qy").value=debi("fader").value=0;
    for(let i=0;i<db_cnt;i++){
		button_array.push(new myButton());
		let high_limit=225;
		let low_limit=45;
		let step=(high_limit-low_limit)/(db_cnt/6)//fixed v1.0.2
		if(i!=0){
			let b1_color=button_array[i-1].color;
			let target_color="";
			if(button_array[i-2]==undefined){
				let r_n=b1_color.split(",")[0];
				let g_n=b1_color.split(",")[1];
				let b_n=Number(b1_color.split(",")[2])-step;//fixed v1.0.2
				target_color=r_n+','+g_n+','+b_n+','+1.00;
			}
			else{
				let b2_color=button_array[i-2].color;
				let r2_n=Number(b2_color.split(",")[0]);
				let g2_n=Number(b2_color.split(",")[1]);
				let b2_n=Number(b2_color.split(",")[2]);
				let r1_n=Number(b1_color.split(",")[0]);
				let g1_n=Number(b1_color.split(",")[1]);
				let b1_n=Number(b1_color.split(",")[2]);

				if(g1_n==high_limit && r2_n-r1_n<0){
					if(r1_n!=g1_n){
						target_color=(r1_n+step)+','+g1_n+','+b1_n+','+1.00;
					}
					else{
						target_color=r1_n+','+(g1_n-step)+','+b1_n+','+1.00;
					}
				}
				else if(g1_n==low_limit && r2_n-r1_n>0){
					if(r1_n!=g1_n){
						target_color=(r1_n-step)+','+g1_n+','+b1_n+','+1.00;
					}
					else{
						target_color=r1_n+','+(g1_n+step)+','+b1_n+','+1.00;
					}
				}
				else if(b1_n==low_limit && g2_n-g1_n>0){
					if(g1_n!=b1_n){
						target_color=r1_n+','+(g1_n-step)+','+b1_n+','+1.00;
					}
					else{
						target_color=r1_n+','+g1_n+','+(b1_n+step)+','+1.00;
					}
				}
				else if(b1_n==high_limit && g2_n-g1_n<0){
					if(g1_n!=b1_n){
						target_color=r1_n+','+(g1_n+step)+','+b1_n+','+1.00;
					}
					else{
						target_color=r1_n+','+g1_n+','+(b1_n-step)+','+1.00;
					}
				}
				else if(r1_n==high_limit && b2_n-b1_n<0){
					if(r1_n!=b1_n){
						target_color=r1_n+','+g1_n+','+(b1_n+step)+','+1.00;
					}
					else{
						target_color=(r1_n-step)+','+g1_n+','+b1_n+','+1.00;
					}
				}
				else if(r1_n==low_limit && b2_n-b1_n>0){
					if(r1_n!=b1_n){
						target_color=r1_n+','+g1_n+','+(b1_n-step)+','+1.00;
					}
					else{
						target_color=(r1_n+step)+','+g1_n+','+b1_n+','+1.00;
					}
				}
			}
			button_array[i].color=target_color;
			//console.log("button_array["+i+"].color="+button_array[i].color);
		}
		else{
			//console.log("i="+i);
		}
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
		debi("bnn-"+i).style.color="white";
		debi("bti-"+i).style.color="white";
		debi("bt-"+i).style.color="white";
		debi("bdn-"+i).style.color="white";
		debi("bdn-"+i).style.fontWeight="bold";		
        let target_height=(Math.ceil(button_array.length/6)*100+100)+"px";
        debi("button_background").style.height=target_height;
    }
	//sub_win=open("movie.html","Display Window",window_options);
  }

var array_num=-1;

function trans_color(get_color,num,cn){
	let l_color=get_color;
	let r_n=Number(l_color.split(",")[0])+num;
	let g_n=Number(l_color.split(",")[1])+num;
	let b_n=Number(l_color.split(",")[2])+num;
	return "rgba("+r_n+","+g_n+","+b_n+","+cn+")";
	
}

function t_remain(){
	let remaining=(debi("mov-"+array_num).duration-debi("mov-"+array_num).currentTime);
	let second;
	if(Math.floor(remaining/60)==0){
		remaining=remaining.toFixed(1);
	}
	else{
		if((remaining-(60*Math.floor(remaining/60))).toFixed(1)<10){
			second="0"+(remaining-(60*Math.floor(remaining/60))).toFixed(1);
			remaining=Math.floor(remaining/60)+'"'+second;
		}
		else{
			remaining=Math.floor(remaining/60)+'"'+(remaining-(60*Math.floor(remaining/60))).toFixed(1);
		}
	}
    debi("bti-"+array_num).innerHTML=remaining+" /";
}

function t_ing(num){
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

var fo_time=0;
function stop_playing(num){
    if(fade_on==1 && debi("fader").value!=0){
        fo_time=debi("fader").value;
        //console.log("fading stop");
        button_array[num].fading=1;
        debi("bld-"+num).style.backgroundColor=trans_color(button_array[num].color,-75,0.30);
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
    console.log("clear button_array[num].timer-ID="+button_array[num].timer);
    debi("mov-"+num).pause();
    debi("mov-"+num).currentTime = 0;
    debi("mov-"+num).volume = 1;
    if(fade_on==1){
        clearInterval(flick);
        console.log("clear flick-ID="+flick);
        fade_on=0;
        debi("f_b").style.color="rgba(240,248,255,1.00)";
        debi("f_b_div").style.backgroundColor="rgba(170,170,170,1.00)";
    }
    //if(waiting_num>=0){
        //start_to_play(waiting_num);
    //}
    /*{//delete clearInterval-ID zombie on console
        debi("movie-"+num).innerHTML='<video id="mov-'+num+'" height="0px" width="0px"></video>';
        debi("mov-"+num).src=button_array[num].url;
        debi("mov-"+num).addEventListener("loadedmetadata", ()=>{
            debi("bt-"+num).innerHTML=data_duration(debi("mov-"+num).duration); 
            //num=-1;
        });
    }*/
    debi("b-"+num).style.backgroundColor="rgba("+button_array[num].color+")";
    let b_color=trans_color(button_array[num].color,-75,1.00);
    debi("b-"+num).style.borderTop="0px solid gray";
    debi("b-"+num).style.borderLeft="0px solid gray";
    debi("b-"+num).style.borderBottom="4px solid "+b_color;
    debi("b-"+num).style.borderRight="4px solid "+b_color;
    debi("bnd-"+num).style.backgroundColor="";
    debi("bnn-"+num).style.color=trans_color(button_array[num].color,-75,1.00);
    debi("btd-"+num).style.fontWeight="normal";
    debi("bti-"+num).innerHTML="";
    debi("bdn-"+num).style.color="white";
    debi("bld-"+num).style.backgroundColor=trans_color(button_array[num].color,-75,0.00);
    debi("bld-"+num).innerHTML="";
    button_array[num].on=0;
}

var out_time=0;
function sound_fade_out(num){
    out_time+=0.1;
    if(fo_time<=out_time){
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
                debi("bld-"+num).innerHTML='<span style="font-size:28pt; font-weight:bold; transform: scale(1, 1.25); color:rgba(255,255,255,1.00);">OUT</span>';//<span style="font-size:20px; color:rgba(255,255,255,1.00);">Fading</span>
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
                debi("bld-"+num).innerHTML='<span style="font-size:28pt; font-weight:bold; transform: scale(1, 1.25); color:rgba(255,255,255,1.00);">OUT</span>';//<span style="font-size:20px; color:rgba(255,255,255,1.00);">Fading</span>
            }
            else{
                debi("bld-"+num).innerHTML="";
            }
        }
    }
}

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
        debi("bld-"+num).style.backgroundColor=trans_color(button_array[num].color,-75,0.30);
    }
    if(button_array[num].data.indexOf("audio")>=0){
        debi("mov-"+num).play();
        button_array[num].on=1;
    }
    else{
        //open("movie.html","Display Window",window_options);
    }
    button_array[num].timer=setInterval(()=>{t_ing(num)},100);
    debi("b-"+num).style.backgroundColor=trans_color(button_array[num].color,75,0.30);
    let b_color=trans_color(button_array[num].color,-75,1.00);
    debi("b-"+num).style.borderTop="2px solid "+b_color;
    debi("b-"+num).style.borderLeft="2px solid "+b_color;
    debi("b-"+num).style.borderBottom="2px solid "+b_color;
    debi("b-"+num).style.borderRight="2px solid "+b_color;
    debi("bnn-"+num).style.color=trans_color(button_array[num].color,0,0.50);
    debi("btd-"+num).style.backgroundColor=trans_color(button_array[num].color,-100,0.30);
    //debi("btd-"+num).style.fontWeight="bold";
    debi("bdn-"+num).style.color=trans_color(button_array[num].color,-30,1.00);
    waiting_num=-1;
}   

var in_time=0;
function sound_fade_in(num){
    //debi("mov-"+num).volume=0;
    in_time+=0.1;
    if(fi_time<=in_time){
        debi("bld-"+num).style.backgroundColor=trans_color(button_array[num].color,-75,0.00);
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
                debi("bld-"+num).innerHTML='<span style="font-size:28pt;  font-weight:bold;transform: scale(1, 1.25); color:rgba(255,255,255,1.00);">IN</span>';//<span style="font-size:20px; color:rgba(255,255,255,1.00);">Fading</span>
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
                debi("bld-"+num).innerHTML='<span style="font-size:28pt;  font-weight:bold;transform: scale(1, 1.25); color:rgba(255,255,255,1.00);">IN</span>';//<span style="font-size:20px; color:rgba(255,255,255,1.00);">Fading</span>
            }
            else{
                debi("bld-"+num).innerHTML="";
            }
        }
    }
}

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
        //console.log("drop "+e.target.id);
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
				debi("movie-"+file_id.split("-")[1]).innerHTML='<video id="mov-'+file_id.split("-")[1]+'" height="0px" width="0px"></video>';
				debi("mov-"+file_id.split("-")[1]).src=create;
				button_array[Number(file_id.split("-")[1])].url=create;
				debi("mov-"+file_id.split("-")[1]).addEventListener("loadedmetadata", ()=>{
					debi("bt-"+file_id.split("-")[1]).innerHTML=data_duration(debi("mov-"+file_id.split("-")[1]).duration); 
				});
				debi("b-"+file_id.split("-")[1]).style.backgroundColor="rgba("+button_array[file_id.split("-")[1]].color+")";
				let b_color=trans_color(button_array[file_id.split("-")[1]].color,-75,1.00);
				debi("b-"+file_id.split("-")[1]).style.borderTop="0px solid white";
				debi("b-"+file_id.split("-")[1]).style.borderLeft="0px solid white";
				debi("b-"+file_id.split("-")[1]).style.borderBottom="4px solid "+b_color;
				debi("b-"+file_id.split("-")[1]).style.borderRight="4px solid "+b_color;
                debi("bnn-"+file_id.split("-")[1]).className="b_number_on";
                debi("bnn-"+file_id.split("-")[1]).style.color=trans_color(button_array[file_id.split("-")[1]].color,-75,1.00);
                debi("btd-"+file_id.split("-")[1]).style.backgroundColor=trans_color(button_array[file_id.split("-")[1]].color,-45,0.30);
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

function select_data(){
    debi("selected_data").click();
}

var file_id="";
document.oncontextmenu =(e)=>{
    if(e.target.id){
        //console.log(e.target.id);
        if(e.target.id.indexOf("bld-")>=0){
			file_id=e.target.id;
            if(debi("movie-"+e.target.id.split("-")[1]).innerHTML==""){
				debi("selected_data").click();
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
                        confirm_line+='<input type="button" id="b_delete" class="size_13" value="Delete" onClick="delete_data()">';
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
    	let create=URL.createObjectURL(debi("selected_data").files[0]);// faster than readAsDataURL()
		//let create=debi("selected_data").files[0];//waiting for srcObject depend on browser
		//button_array[Number(file_id.split("-")[1])].data= create; 
		debi("movie-"+file_id.split("-")[1]).innerHTML='<video id="mov-'+file_id.split("-")[1]+'" height="0px" width="0px"></video>';
		debi("mov-"+file_id.split("-")[1]).src=create;
		button_array[Number(file_id.split("-")[1])].url=create;
		debi("mov-"+file_id.split("-")[1]).addEventListener("loadedmetadata", ()=>{
			debi("bt-"+file_id.split("-")[1]).innerHTML=data_duration(debi("mov-"+file_id.split("-")[1]).duration); 
		});
		button_array[Number(file_id.split("-")[1])].data= debi("selected_data").files[0].type;
        debi("bdn-"+file_id.split("-")[1]).innerHTML=debi("selected_data").files[0].name;
        button_array[Number(file_id.split("-")[1])].name=debi("selected_data").files[0].name;
		debi("b-"+file_id.split("-")[1]).style.backgroundColor="rgba("+button_array[file_id.split("-")[1]].color+")";
        let b_color=trans_color(button_array[file_id.split("-")[1]].color,-75,1.00);
		debi("b-"+file_id.split("-")[1]).style.borderTop="0px solid white";
		debi("b-"+file_id.split("-")[1]).style.borderLeft="0px solid white";
		debi("b-"+file_id.split("-")[1]).style.borderBottom="4px solid "+b_color;
		debi("b-"+file_id.split("-")[1]).style.borderRight="4px solid "+b_color;
        debi("bnn-"+file_id.split("-")[1]).className="b_number_on";
        debi("bnn-"+file_id.split("-")[1]).style.color=trans_color(button_array[file_id.split("-")[1]].color,-75,1.00);
        debi("btd-"+file_id.split("-")[1]).style.backgroundColor=trans_color(button_array[file_id.split("-")[1]].color,-45,0.30);
        debi("selected_data").value="";
	}
	else{
		alert("Sorry no sound data");
	}
	debi("confirm_background").style.display='none';
	debi("confirm_lay").style.display='none';
 }

function change_data(){
	debi("selected_data").click();
}

function cancel_data(){
	debi("confirm_background").style.display='none';
	debi("confirm_lay").style.display='none';	
}

function delete_data(){
	debi("b-"+file_id.split("-")[1]).style.backgroundColor="rgba(170,170,170,1.00)";
    debi("b-"+file_id.split("-")[1]).style.border="2px solid rgba(147,147,147,1.00)";
    /*debi("b-"+file_id.split("-")[1]).style.borderLeft="2px solid rgba(147,147,147,1.00)";
    debi("b-"+file_id.split("-")[1]).style.borderBottom="2px solid rgba(147,147,147,1.00)";
    debi("b-"+file_id.split("-")[1]).style.borderRight="2px solid rgba(147,147,147,1.00)";*/
    debi("bnn-"+file_id.split("-")[1]).className="b_number_off";
    debi("bnn-"+file_id.split("-")[1]).style.color="white";
    debi("bnn-"+file_id.split("-")[1]).style.fontWeight="normal";
    debi("bt-"+file_id.split("-")[1]).innerHTML="";
    debi("bdn-"+file_id.split("-")[1]).innerHTML="";
    debi("movie-"+file_id.split("-")[1]).innerHTML="";
    delete button_array[Number(file_id.split("-")[1])].name;
    delete button_array[Number(file_id.split("-")[1])].data;
    delete button_array[Number(file_id.split("-")[1])].url;
	debi("confirm_background").style.display='none';
	debi("confirm_lay").style.display='none';
    console.log('debi(movie-'+file_id.split("-")[1]+').innerHTML='+debi("movie-"+file_id.split("-")[1]).innerHTML);
}