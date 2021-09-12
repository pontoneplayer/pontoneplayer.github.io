document.onkeydown=key_down; //ページ
function key_down(event){//
    if(event.key==" " || event.key=="　"){//
		for(let i=0;i<button_array.length;i++){
			if(button_array[i].on==1){
				if(button_array[i].data.indexOf("audio")>=0){
					debi("mov-"+i).pause();
					debi("mov-"+i).currentTime = 0;
					clearInterval(button_array[i].timer);//function
					//console.log("clear setInterval-ID="+button_array[i].timer);
					{//clearInterval誤作動防止
						debi("movie-"+i).innerHTML="";
						debi("movie-"+i).innerHTML='<video id="mov-'+i+'" hieght="0px" width="0px"></video>';
						debi("mov-"+i).src=button_array[i].url;
						//console.log(debi("mov-"+i).src);
						debi("mov-"+i).addEventListener("loadedmetadata", ()=>{
							debi("bt-"+i).innerHTML=data_duration(debi("mov-"+i).duration)+" s"; 
						});
					}
				}
				else{
					open("movie.html","Display Window",window_options);
					window.focus();
				}
				debi("b-"+i).style.backgroundColor="rgba("+button_array[i].color+")";
				debi("bnd-"+i).style.backgroundColor="";
				debi("bld-"+i).style.backgroundColor="rgba(255,255,255,0.00)";
				debi("bnn-"+i).style.color="white";
				//debi("bt-"+array_num).innerHTML=debi("mov-"+array_num).duration.toFixed(1)+" s";
				debi("bt-"+i).style.color="white";
				debi("bdn-"+i).style.color="white";
				button_array[i].on=0;
				break;
			}
		}
		return false;
	}
}

function debi(id){
	return document.getElementById(id);
}

function myButton(){//ボタンオブジェクト
	this.color="45,225,225,1.00";
    this.on=0;
	this.data=""
    this.url="";
    this.timer;
}

var button_array=[];
var sub_win;
var window_options = "menubar=no,location=yes,resizable=yes,scrollbars=no,status=no";

function make_buttons(){
    for(let i=0;i<24;i++){
		button_array.push(new myButton());
		//console.log("button_array["+i+"].color="+button_array[i].color);
		let high_limit=225;
		let low_limit=45;
		if(i!=0){
			let b1_color=button_array[i-1].color;
			//console.log("b1_color="+b1_color);
			let target_color="";
			if(button_array[i-2]==undefined){
				let r_n=b1_color.split(",")[0];
				let g_n=b1_color.split(",")[1];
				let b_n=Number(b1_color.split(",")[2])-60;
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
				//console.log(r2_n+","+g2_n+","+b2_n+","+r1_n+","+g1_n+","+b1_n);

				if(g1_n==high_limit && r2_n-r1_n<0){
					//console.log("red!");
					if(r1_n!=g1_n){
						target_color=(r1_n+60)+','+g1_n+','+b1_n+','+1.00;
					}
					else{
						target_color=r1_n+','+(g1_n-60)+','+b1_n+','+1.00;
					}
				}
				else if(g1_n==low_limit && r2_n-r1_n>0){
					//console.log("red!");
					if(r1_n!=g1_n){
						target_color=(r1_n-60)+','+g1_n+','+b1_n+','+1.00;
					}
					else{
						target_color=r1_n+','+(g1_n+60)+','+b1_n+','+1.00;
					}
				}
				else if(b1_n==low_limit && g2_n-g1_n>0){
					//console.log("green!");
					if(g1_n!=b1_n){
						target_color=r1_n+','+(g1_n-60)+','+b1_n+','+1.00;
					}
					else{
						target_color=r1_n+','+g1_n+','+(b1_n+60)+','+1.00;
					}
				}
				else if(b1_n==high_limit && g2_n-g1_n<0){
					//console.log("green!");
					if(g1_n!=b1_n){
						target_color=r1_n+','+(g1_n+60)+','+b1_n+','+1.00;
					}
					else{
						target_color=r1_n+','+g1_n+','+(b1_n-60)+','+1.00;
					}
				}
				else if(r1_n==high_limit && b2_n-b1_n<0){
					//console.log("blue!");
					if(r1_n!=b1_n){
						target_color=r1_n+','+g1_n+','+(b1_n+60)+','+1.00;
					}
					else{
						target_color=(r1_n-60)+','+g1_n+','+b1_n+','+1.00;
					}
				}
				else if(r1_n==low_limit && b2_n-b1_n>0){
					//console.log("blue!");
					if(r1_n!=b1_n){
						target_color=r1_n+','+g1_n+','+(b1_n-60)+','+1.00;
					}
					else{
						target_color=(r1_n+60)+','+g1_n+','+b1_n+','+1.00;
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
            buttons_line+='<div id="bnd-'+i+'" class="bn_div">';
                buttons_line+='<span id="bnn-'+i+'" class="b_number">';
                    if(i<9){
                        buttons_line+='0'+(i+1);
                    }
                    else{
                        buttons_line+=(i+1);
                    }
                buttons_line+='</span>';
                buttons_line+='<span id="bt-'+i+'" class="b_time">';
                buttons_line+='</span>';
            buttons_line+='</div>';
            buttons_line+='<div id="bdd-'+i+'" class="bd_div">';
                buttons_line+='<span id="bdn-'+i+'" class="d_name">';
                buttons_line+='</span>';
            buttons_line+='</div>';        
            buttons_line+='<div id="bld-'+i+'" class="b_lay">';
            buttons_line+='</div>';
            buttons_line+='<div id="movie-'+i+'">';
				//buttons_line+='<video id="mov-'+i+'" hieght="0px" width="0px"></video>';
			buttons_line+='</div>';
		buttons_line+='</div>';
		debi("button_background").innerHTML+=buttons_line;
		debi("bnn-"+i).style.color="white";
		debi("bt-"+i).style.color="white";
		debi("bdn-"+i).style.color="white";
		debi("b-"+i).style.backgroundColor="rgba("+127+","+127+","+127+","+0.80+")";
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

function t_remain(){// 
	let remaining=(debi("mov-"+array_num).duration-debi("mov-"+array_num).currentTime);
	let second;
	if(Math.floor(remaining/60)==0){
		remaining=remaining.toFixed(1)+" s";
	}
	else{
		if((remaining-(60*Math.floor(remaining/60))).toFixed(1)<10){
			second="0"+(remaining-(60*Math.floor(remaining/60))).toFixed(1);
			remaining=Math.floor(remaining/60)+"'"+second+" s";
		}
		else{
			remaining=Math.floor(remaining/60)+"'"+(remaining-(60*Math.floor(remaining/60))).toFixed(1)+" s";
		}
		
	}
    debi("bt-"+array_num).innerHTML=remaining;
}

    
document.addEventListener('click', (e)=>{
	//console.log("click= "+e.target.id);
	if(e.target.id){
		if(e.target.id.indexOf("bld-")>=0){
 			if(debi("bdn-"+e.target.id.split("-")[1]).style.color=="white"){
				if(debi("bdn-"+e.target.id.split("-")[1]).innerHTML!=""){
				    for(let i=0;i<button_array.length;i++){
						if(button_array[i].on==1){
							if(button_array[i].data.indexOf("audio")>=0){
								debi("mov-"+i).pause();
								debi("mov-"+i).currentTime = 0;;
                                clearInterval(button_array[i].timer);//function
								{//clearInterval誤作動防止
									debi("movie-"+i).innerHTML="";
									debi("movie-"+i).innerHTML='<video id="mov-'+i+'" hieght="0px" width="0px"></video>';
									debi("mov-"+i).src=button_array[i].url;
									debi("mov-"+i).addEventListener("loadedmetadata", ()=>{
										debi("bt-"+i).innerHTML=data_duration(debi("mov-"+i).duration)+" s"; 
									});
								}
							}
							else{
								open("movie.html","Display Window",window_options);
								window.focus();
							}
							debi("b-"+i).style.backgroundColor="rgba("+button_array[i].color+")";
							debi("bnd-"+i).style.backgroundColor="";
							//debi("bld-"+i).style.backgroundColor="rgba(255,255,255,0.00)";
							//debi("bnn-"+i).style.color="white";
							//debi("bt-"+i).style.color="white";
							debi("bdn-"+i).style.color="white";
							button_array[i].on=0;
							break;
						}
                    }
                    array_num=Number(e.target.id.split("-")[1]);
					debi("mov-"+array_num).addEventListener("ended", ()=>{
						console.log("ended in !");
						clearInterval(button_array[array_num].timer);
						{//clearInterval誤作動防止
							debi("movie-"+array_num).innerHTML="";
							debi("movie-"+array_num).innerHTML='<video id="mov-'+array_num+'" hieght="0px" width="0px"></video>';
							debi("mov-"+array_num).src=button_array[array_num].url;
							debi("mov-"+array_num).addEventListener("loadedmetadata", ()=>{
								debi("bt-"+array_num).innerHTML=data_duration(debi("mov-"+array_num).duration)+" s"; 
								array_num=-1;
							});
						}
						debi("b-"+array_num).style.backgroundColor="rgba("+button_array[array_num].color+")";
						debi("bnd-"+array_num).style.backgroundColor="";
						//debi("bld-"+array_num).style.backgroundColor="rgba(255,255,255,0.00)";
						//debi("bnn-"+array_num).style.color="white";
						//debi("bt-"+array_num).style.color="white";
						debi("bdn-"+array_num).style.color="white";
						button_array[array_num].on=0;
					});
					if(button_array[array_num].data.indexOf("audio")>=0){
                        debi("mov-"+array_num).play();
                        button_array[array_num].on=1;
					}
					else{
						//open("movie.html","Display Window",window_options);
					}
                    button_array[array_num].timer=setInterval(t_remain,100);
					debi("b-"+array_num).style.backgroundColor=trans_color(button_array[array_num].color,50,0.50);
					debi("bnd-"+array_num).style.backgroundColor="rgba("+button_array[array_num].color+")";
					//debi("bld-"+array_num).style.backgroundColor="rgba(255,255,255,0.00)";
					//debi("bnn-"+array_num).style.color="white";
					//debi("bt-"+array_num).style.color="white";
                    debi("bdn-"+array_num).style.color=trans_color(button_array[array_num].color,-30,1.00);
				}
				else{
				}
			}
			else{
				if(button_array[array_num].data.split(",")[0].indexOf("audio")>=0){
					debi("mov-"+array_num).pause();
					debi("mov-"+array_num).currentTime = 0;
					clearInterval(button_array[array_num].timer);
					{//clearInterval誤作動防止
						debi("movie-"+array_num).innerHTML="";
						debi("movie-"+array_num).innerHTML='<video id="mov-'+array_num+'" hieght="0px" width="0px"></video>';
						debi("mov-"+array_num).src=button_array[array_num].url;
						debi("mov-"+array_num).addEventListener("loadedmetadata", ()=>{
							debi("bt-"+array_num).innerHTML=data_duration(debi("mov-"+array_num).duration)+" s"; 
							array_num=-1;
						});
					}	
				}
				else{
					open("movie.html","Display Window",window_options);
                    window.focus();
				}
				debi("b-"+array_num).style.backgroundColor="rgba("+button_array[array_num].color+")";
				debi("bnd-"+array_num).style.backgroundColor="";
				//debi("bld-"+array_num).style.backgroundColor="rgba(255,255,255,0.00)";
				//debi("bnn-"+array_num).style.color="white";
                //debi("bt-"+array_num).style.color="white";
				debi("bdn-"+array_num).style.color="white";
				button_array[array_num].on=0;
			}
		}
	}
//}
});

document.onmouseover=mouse_over;
function mouse_over(e){
	if(e.target.id.indexOf("bld-")>=0){
        //console.log("onmauseover "+e.target.id);
	}
}
document.ondragenter=drag_enter;
function drag_enter(e){
	if(e.target.id.indexOf("bld-")>=0){
        //console.log("ondragenter "+e.target.id);
        e.stopPropagation();
        e.preventDefault();
	}
}
document.ondragover=drag_over;
function drag_over(e){
	if(e.target.id.indexOf("bld-")>=0){
        //console.log("ondragover "+e.target.id);
        e.stopPropagation();
        e.preventDefault();
	}
}
document.ondrop=drop;
function drop(e){
	if(e.target.id.indexOf("bld-")>=0){
        console.log("drop "+e.target.id);
		file_id=e.target.id;
        e.stopPropagation();
        e.preventDefault();
		if(debi("bnn-"+file_id.split("-")[1]).style.color!="black"){
		const drop_files = e.dataTransfer.files;
		debi("bdn-"+file_id.split("-")[1]).innerHTML=drop_files[0].name;
		button_array[Number(file_id.split("-")[1])].name=drop_files[0].name;
		let create=URL.createObjectURL(drop_files[0]);// faster than readAsDataURL()
		//let create=debi("selected_data").files[0];//waiting for srcObject depend on browser
		//button_array[Number(file_id.split("-")[1])].data= create; 
		button_array[Number(file_id.split("-")[1])].data= drop_files[0].type; 
		if(drop_files[0].type.indexOf("audio")>=0){
			debi("movie-"+file_id.split("-")[1]).innerHTML='<video id="mov-'+file_id.split("-")[1]+'" hieght="0px" width="0px"></video>';
			debi("mov-"+file_id.split("-")[1]).src=create;
			button_array[Number(file_id.split("-")[1])].url=create;
			debi("b-"+file_id.split("-")[1]).style.backgroundColor="rgba("+button_array[file_id.split("-")[1]].color+")";
			debi("mov-"+file_id.split("-")[1]).addEventListener("loadedmetadata", ()=>{
				debi("bt-"+file_id.split("-")[1]).innerHTML=data_duration(debi("mov-"+file_id.split("-")[1]).duration)+" s"; 
			});
		}
		}
	}
}

function select_data(){
    debi("selected_data").click();
}

var file_id="";
document.oncontextmenu =(e)=>{
    if(e.target.id){
        console.log(e.target.id);
        if(e.target.id.indexOf("bld-")>=0){
			file_id=e.target.id;
            if(debi("movie-"+e.target.id.split("-")[1]).innerHTML==""){
                //console.log("movie be");
                debi("selected_data").click();
                return false;//
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

function data_duration(num){
	let remaining;
	let second;
	if(Math.floor(num/60)==0){
		remaining=num.toFixed(1);
	}
	else{
		if((num-(60*Math.floor(num/60))).toFixed(1)<10){
			second="0"+(num-(60*Math.floor(num/60))).toFixed(1);
			remaining=Math.floor(num/60)+"'"+second;
		}
		else{
			remaining=Math.floor(num/60)+"'"+(num-(60*Math.floor(num/60))).toFixed(1);
		}
	}
	return remaining;
}

function link_data(){
    //console.log("link_data()");
    debi("bdn-"+file_id.split("-")[1]).innerHTML=debi("selected_data").files[0].name;
    button_array[Number(file_id.split("-")[1])].name=debi("selected_data").files[0].name;
    let create=URL.createObjectURL(debi("selected_data").files[0]);//廃止予定しかしreadAsDataURL()より速い
	//let create=debi("selected_data").files[0];//waiting for srcObject depend on browser
	//button_array[Number(file_id.split("-")[1])].data= create; 
	button_array[Number(file_id.split("-")[1])].data= debi("selected_data").files[0].type; 
	if(debi("selected_data").files[0].type.indexOf("audio")>=0){
		debi("movie-"+file_id.split("-")[1]).innerHTML='<video id="mov-'+file_id.split("-")[1]+'" hieght="0px" width="0px"></video>';
		debi("mov-"+file_id.split("-")[1]).src=create;
		button_array[Number(file_id.split("-")[1])].url=create;
		debi("mov-"+file_id.split("-")[1]).addEventListener("loadedmetadata", ()=>{
			debi("bt-"+file_id.split("-")[1]).innerHTML=data_duration(debi("mov-"+file_id.split("-")[1]).duration)+" s"; 
		});
		debi("b-"+file_id.split("-")[1]).style.backgroundColor="rgba("+button_array[file_id.split("-")[1]].color+")";
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
	debi("b-"+file_id.split("-")[1]).style.backgroundColor="rgba("+127+","+127+","+127+","+0.80+")";
    debi("bt-"+file_id.split("-")[1]).innerHTML="";
    debi("bdn-"+file_id.split("-")[1]).innerHTML="";
    debi("movie-"+file_id.split("-")[1]).innerHTML="";
    delete button_array[Number(file_id.split("-")[1])].name;
    delete button_array[Number(file_id.split("-")[1])].data;
    delete button_array[Number(file_id.split("-")[1])].url;
	debi("confirm_background").style.display='none';
	debi("confirm_lay").style.display='none';	
}