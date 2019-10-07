function tampil(idku){
    $("#"+idku).slideToggle();
}

function komen(rcdId){
    $("#"+rcdId).slideToggle();
}

function tugas(rcdI){
    $("#formtask"+rcdI).slideToggle();
    $("#usertask"+rcdI).slideToggle();
}

function autofille(){
    var e_id = $('input#employee_id').val();
    var e_name = $('input#employee_name').val();
    $.ajax({
        url:'http://127.0.0.1:5000/employee',
        method:'GET',

        success:function(response){
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].employee_id == e_id && response.data[i].employee_name == e_name){
                    document.getElementById("employee_pcode").value = response.data[i].position_code;
                    document.getElementById("employee_p").value = response.data[i].position;

                    document.getElementById("e_company").value = response.data[i].company;
                    document.getElementById("e_costid").value = response.data[i].costcntr_id;
                    document.getElementById("e_costname").value = response.data[i].costcntr_name;
                    document.getElementById("e_perarea").value = response.data[i].personal_area;
                    document.getElementById("e_group").value = response.data[i].employee_group;
                    document.getElementById("e_subgroup").value = response.data[i].employee_subgroup;
                    break;
                }else{
                    document.getElementById("employee_pcode").value = "";
                    document.getElementById("employee_p").value = "";

                    document.getElementById("e_company").value = "";
                    document.getElementById("e_costid").value = "";
                    document.getElementById("e_costname").value = "";
                    document.getElementById("e_perarea").value = "";
                    document.getElementById("e_group").value = "";
                    document.getElementById("e_subgroup").value = "";
                }
            }
        },
        error:function(){
            alert("Login Failed Username / Password is Wrong")
        }
    });
}

function autofille2(){
    var j_code = $('input#poscode').val();
    $.ajax({
        url:'http://127.0.0.1:5000/jobdesc',
        method:'GET',

        success:function(response){
            for (var i=0;i<response.data.length;i++){
                if (response.data[i].position_code == j_code){
                    document.getElementById("position").value = response.data[i].position;
                    document.getElementById("costid").value = response.data[i].cost_center_id;

                    document.getElementById("costname").value = response.data[i].cost_center_name;
                    document.getElementById("dcostid").value = response.data[i].dcost_center_id;
                    document.getElementById("dcostname").value = response.data[i].dcost_center_name;
                    document.getElementById("company").value = response.data[i].company;
                    document.getElementById("perarea").value = response.data[i].personal_area;
                    document.getElementById("persubarea").value = response.data[i].personal_subarea;
                    document.getElementById("em_type").value = response.data[i].employee_type;
                    break;
                }else{
                    document.getElementById("position").value = "";
                    document.getElementById("costid").value = "";

                    document.getElementById("costname").value = "";
                    document.getElementById("dcostid").value = "";
                    document.getElementById("dcostname").value = "";
                    document.getElementById("company").value = "";
                    document.getElementById("perarea").value = "";
                    document.getElementById("persubarea").value = "";
                    document.getElementById("em_type").value = "";
                }
            }
        },
        error:function(){
            alert("Login Failed Username / Password is Wrong")
        }
    });
}

var creatorId = getCookie("id")
var creatorName = getCookie("name")
var posisi = getCookie("posisi")
var position = getCookie("position")

function showAwal(){
    document.getElementById("req_name").value = creatorName;
    document.getElementById("req_npk").value = creatorId;
    document.getElementById("req_position").value = position;
}
showAwal()

var token = '9JMl7hhZYU3e-6yJhDu9Fa4CfFJ107I27dDOKw-Ndbw.o0GNEFYk03J88SwJioz-N9Yo4-9na-8EpgQL5p2BU98'
function createreq(){
    
    $.ajax({
        url:'https://mosaic-engine.dev.nextflow.tech/nextflow/api/records',
        method:'POST',
        headers: {'Authorization': 'Bearer '+token},
        contentType:'application/json',
        data:JSON.stringify({
            "data": {
                "definition": {
                  "id": "definitions:bpmn:be2be614-d708-42cc-b219-a2d7cf62b43b"
                }
              }
        }),

        success:function(response){
            console.log(response.data.id)
            // alert("berhasil")
            $.ajax({
                url:'https://mosaic-engine.dev.nextflow.tech/nextflow/api/records/'+response.data.id+'/submit',
                method:'POST',
                headers: {'Authorization': 'Bearer '+token},
                contentType:'application/json',
                data:JSON.stringify({
                    "data": {
                        "form_data": {
                            "action": "submit",
                            "requesterEmail":"afauzanadziima@gmail.com",
                            "requesterName":"Andri"
                        },
                      "comment": "This is a comment. Just a test yo"
                      }
                }),
        
                success:function(response){
                    // alert("berhasil")
                    console.log(response.data.id)
                    console.log(response.data.process_id)
                    
                    $.ajax({
                        url:'http://127.0.0.1:5000/createHistory',
                        method:'POST',
                        contentType:'application/json',
                        data:JSON.stringify({
                            "creatorId":creatorId,
                            "creatorName":creatorName,
                            "record_id":response.data.id,
                            "process_id":response.data.process_id                  
                        }),
                
                        success:function(response){
                            // alert("berhasil")

                        },
                        error:function(){
                            alert("error")
                        }
                    });

                    $.ajax({
                        url:'http://127.0.0.1:5000/comHistory',
                        method:'POST',
                        contentType:'application/json',
                        data:JSON.stringify({
                            "task_id":"task_id type (submit)",
                            "record_id":response.data.id,
                            "created_at":response.data.created_at,
                            "completed_at":response.data.created_at,
                            "name":creatorName,
                            "position":position,
                            "response":"submit",
                            "comment":"for "+$('input#employee_name').val()                
                        }),
                
                        success:function(response){
                            // alert("berhasil")

                        },
                        error:function(){
                            alert("error")
                        }
                    });

                    $.ajax({
                        url:'http://127.0.0.1:5000/createreq',
                        method:'POST',
                        contentType:'application/json',
                        data:JSON.stringify({
                            "record_id":response.data.id,
                            "process_id":response.data.process_id,
                            'req_name':$('input#req_name').val(),
                            'req_npk':$('input#req_npk').val(),
                            'req_position':$('input#req_position').val(),
                            'ob_name':$('input#ob_name').val(),
                            'ob_position':$('input#ob_position').val(),
                            'e_id':$('input#employee_id').val(),
                            'e_name':$('input#employee_name').val(),
                            'e_poscode':$('input#employee_pcode').val(),
                            'e_position':$('input#employee_p').val(),
                            'e_company':$('input#e_company').val(),
                            'e_costid':$('input#e_costid').val(),
                            'e_costname':$('input#e_costname').val(),
                            'e_perarea':$('input#e_perarea').val(),
                            'e_group':$('input#e_group').val(),
                            'e_subgroup':$('input#e_subgroup').val(),
                            'types':$('input#types').val(),
                            'poscode':$('input#poscode').val(),
                            'position':$('input#position').val(),
                            'costid':$('input#costid').val(),
                            'costname':$('input#costname').val(),
                            'dcostid':$('input#dcostid').val(),
                            'dcostname':$('input#dcostname').val(),
                            'company':$('input#company').val(),
                            'perarea':$('input#perarea').val(), 
                            'persubarea':$('input#persubarea').val(),
                            'em_type':$('input#em_type').val(),
                            'receiver':$('input#receiver').val(),
                            'em_date':$('input#em_date').val(),
                            'attach':$('input#attach').val(),
                            'justif':$('input#justif').val()
                        }),
                
                        success:function(response){
                            alert("berhasil")
                            window.location.href=window.location.href;

                        },
                        error:function(){
                            alert("error")
                        }
                    });
                },
                error:function(){
                    alert("error")
                }
            });
        },
        error:function(){
            alert("error")
        }
    });
}

function show_task(){
    var posisi = getCookie("posisi")
    $.ajax({
        url:'http://127.0.0.1:5000/reqlist',
        method:'GET',

        success:function(response){
            var record = []
            var proses = []
            var formlist = []
            for (var i=0;i<response.data.length;i++){
                record.push(response.data[i].record_id)
                proses.push(response.data[i].process_id)
                formlist.push(response.data[i])
            }
            // console.log(record)
            console.log(formlist)
            console.log(record)
            $.ajax({
                url:'https://mosaic-engine.dev.nextflow.tech/nextflow/api/tasks?folder=app%3Atask%3Aall&page%5Bnumber%5D=1&page%5Bsize%5D=95',
                method:'GET',
                headers: {'Authorization': 'Bearer '+token},
        
                success:function(response){
                    for (var j=0;j<record.length;j++){
                        for (var i=0;i<response.data.length;i++){
                            if (record[j] == response.data[i].record_id && proses[j] == response.data[i].process_id && posisi == response.data[i].name){
                                var taskList=`
                                <div class="m-4 border">
                                
                                <span onclick="tugas('${i}')" style="height: 50px"><div class="ml-3" style="line-height: 47px">MY TASK (${response.data[i].record_id})</div></span>

                                <form id="formtask${i}" style="display:none">
                                    <span class="d-block bg-primary border border-dark" style="height: 50px"><div class="ml-3" style="line-height: 47px">REQUESTER INFORMATION</div></span>
                                    <div class="m-4">
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">REQUESTER NAME</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].req_name}" placeholder="REQUESTER NAME" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">REQUESTER NPK</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].req_npk}" placeholder="REQUESTER NPK" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">REQUESTER POSITION</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].req_position}" placeholder="REQUESTER POSITION" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">ON BEHALF NAME</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].ob_name}" placeholder="" disabled>
                                        </div>
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">(Position minimum L4)</label>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">ON BEHALF POSITION</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].ob_position}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">EMPLOYEE</label>
                                        <div class="col-sm-3">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].e_id}" placeholder="EMPLOYEE ID" disabled>
                                        </div>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].e_name}" placeholder="EMPLOYEE NAME" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">PROCESS ID</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].process_id}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    </div>

                                    <span class="d-block bg-primary border border-dark" style="height: 50px"><div class="ml-3" style="line-height: 47px">CURRENT</div></span>
                                    <div class="m-4">
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">POSITION CODE</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].e_poscode}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">POSITION</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].e_position}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">COMPANY</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].e_company}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">COST CENTER</label>
                                        <div class="col-sm-3">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].e_costid}" placeholder="" disabled>
                                        </div>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].e_costname}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">PERSONAL AREA</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].e_perarea}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">EMPLOYEE GROUP</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].e_group}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">EMPLOYEE SUBGROUP</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].e_subgroup}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    </div>
                                    
                                    <span class="d-block bg-primary border border-dark" style="height: 50px"><div class="ml-3" style="line-height: 47px">PROPOSED</div></span>
                                    <div class="m-4">
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">TYPE</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].types}" placeholder="" disabled>
                                        </div>
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">(Update for non staff only)</label>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">POSITION CODE</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].poscode}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">POSITION</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].position}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">COST CENTER</label>
                                        <div class="col-sm-3">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].costid}" placeholder="" disabled>
                                        </div>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].costname}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">DISTRIBUTION COST CENTER</label>
                                        <div class="col-sm-3">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].dcostid}" placeholder="" disabled>
                                        </div>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].dcostname}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">COMPANY</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].company}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">PERSONNEL AREA</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].perarea}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">PERSONNEL SUB AREA</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].persubarea}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">EMPLOYEE TYPE</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].em_type}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">RECEIVER</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].receiver}" placeholder="" disabled>
                                        </div>
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">(Position minimum L4)</label>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">EMPLOYEE DATE START</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].em_date}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">JUSTIFICATION</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].justif}" placeholder="" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row ml-5">
                                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">ATTACHMENT</label>
                                        <div class="col-sm-5">
                                        <input type="text" class="form-control form-control-sm" value="${formlist[j].attach}" placeholder="" disabled>
                                        </div>
                                    </div>

                                    </div>
                                </form>

                                <div id="usertask${i}" style="display:none">
                                <div style="text-align: center">
                                <textarea style="text-align: center" name="" id="komentar${i}" cols="100" rows="3" placeholder="Put your comment here"></textarea>
                                </div>
                                <div id="tombol${i}" style="text-align: center">
                                    <!-- <button onclick="subreqApp('${response.data[i].id}','${i}')" class="btn btn-primary btn-lg">Approve</button> -->
                                    <!-- <button onclick="subreqRej('${response.data[i].id}','${i}')" class="btn btn-primary btn-lg">Reject</button> -->
                                </div>
                                </div>
                                
                                </div>
                                `
                                $('#nav-mytask').append(taskList);

                                if (response.data[i].name=='hrconf'){
                                    tombol = `
                                    <button onclick="subreqApp('${response.data[i].id}','${i}')" class="btn btn-primary btn-lg">Confirm & Send Email</button>
                                    `
                                    $('#tombol'+i).append(tombol);
                                    document.getElementById("notask").style.display = "none";
                                }else{
                                    tombol = `
                                    <button onclick="subreqApp('${response.data[i].id}','${i}')" class="btn btn-primary btn-lg">Approve</button>
                                    <button onclick="subreqRej('${response.data[i].id}','${i}')" class="btn btn-primary btn-lg">Reject</button>
                                    `
                                    $('#tombol'+i).append(tombol);
                                    document.getElementById("notask").style.display = "none";
                                }

                            }
                    }
                    

        
                        // var taskList=`
                        // <div>
                        //     <button>${response.data[i].record_id}</button>
                        // </div>
                        // `
                        // $('#nav-mytask').append(taskList);
                    }
                },
                error:function(){
                    alert("error")
                }
            });
        },
        error:function(){
            alert("error")
        }
    });
}
show_task()

function subreqApp(idpos,iku){
    var komen = $('textarea#komentar'+iku).val();   
    $.ajax({
        url:'https://mosaic-engine.dev.nextflow.tech/nextflow/api/tasks/'+idpos+'/submit',
        method:'POST',
        headers: {'Authorization': 'Bearer '+token},
        contentType:'application/json',
        data:JSON.stringify({
            "data": {
                "form_data": {
                        "action": "approve",
                        "requesterEmail":"afauzanadziima@gmail.com",
                        "requesterName":"Andri"
                },
                "comment": "This is a comment. Just a test yo"
                }
        }),
        success:function(response){
            // alert("berhasil")
            $.ajax({
                url:'http://127.0.0.1:5000/comHistory',
                method:'POST',
                contentType:'application/json',
                data:JSON.stringify({
                    "task_id":response.data.id,
                    "record_id":response.data.record_id,
                    "created_at":response.data.created_at,
                    "completed_at":response.data.completed_at,
                    "name":creatorName,
                    "position":position,
                    "response":"Approve",
                    "comment":komen               
                }),
        
                success:function(response){
                    alert("berhasil")
                    window.location.href=window.location.href;

                },
                error:function(){
                    alert("error")
                }
            });
            

        },
        error:function(){
            alert("error")
        }
    });    
}


function subreqRej(idp,ik){
    var komen = $('textarea#komentar'+ik).val();   
    $.ajax({
        url:'https://mosaic-engine.dev.nextflow.tech/nextflow/api/tasks/'+idp+'/submit',
        method:'POST',
        headers: {'Authorization': 'Bearer '+token},
        contentType:'application/json',
        data:JSON.stringify({
            "data": {
                "form_data": {
                        "action": "reject",
                        "requesterEmail":"afauzanadziima@gmail.com",
                        "requesterName":"Andri"
                },
                "comment": "This is a comment. Just a test yo"
                }
        }),
        success:function(response){
            // alert("berhasil")
            $.ajax({
                url:'http://127.0.0.1:5000/comHistory',
                method:'POST',
                contentType:'application/json',
                data:JSON.stringify({
                    "task_id":response.data.id,
                    "record_id":response.data.record_id,
                    "created_at":response.data.created_at,
                    "completed_at":response.data.completed_at,
                    "name":creatorName,
                    "position":position,
                    "response":"Reject, Submit Ulang",
                    "comment":komen               
                }),
        
                success:function(response){
                    alert("berhasil")
                    window.location.href=window.location.href;

                },
                error:function(){
                    alert("error")
                }
            });
            

        },
        error:function(){
            alert("error")
        }
    });    
}



function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}


function showHistory(ids){
    $.ajax({
        url:'http://127.0.0.1:5000/cHistory/'+ids,
        method:'GET',

        success:function(response){
            var hisRecord = []
            for (var i=0;i<response.data.length;i++){
                hisRecord.push(response.data[i].record_id)
            }

            $.ajax({
                url:'http://127.0.0.1:5000/comHistory',
                method:'GET',
        
                success:function(response){
                    for (var i=0;i<hisRecord.length;i++){
                        var historyCreate =`
                        <div class="m-3 border">
                            <div class="d-block bg-primary border border-dark" style="text-align: center; height: 40px;" onclick="komen('tes${i}')"><div style="line-height: 37px">${hisRecord[i]}</div></div>
                            <div id="tes${i}" style="display:none">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Participant</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Created at</th>
                                    <th scope="col">Completed at</th>
                                    <th scope="col">Response</th>
                                    <th scope="col">Comment</th>
                                </tr>
                                </thead>
                                <tbody id="aku${i}">
                                </tbody>
                            </table>
                            </div>
                        </div>
                        `
                        $('#komenHistory').append(historyCreate);

                        for (var j=0;j<response.data.length;j++){
                            
                            if (hisRecord[i]==response.data[j].record_id){
                                var historyComment =`
                                <tr>
                                    <th>${response.data[j].name}</th>
                                    <td>${response.data[j].position}</td>
                                    <td>${response.data[j].created_at}</td>
                                    <td>${response.data[j].completed_at}</td>
                                    <td>${response.data[j].response}</td>
                                    <td>${response.data[j].comment}</td>
                                </tr>
                                `
                                $('#aku'+i).append(historyComment);
                            }
                        }
                    }                              
                },
                error:function(){
                    alert("erroryes")
                }
            });
                       
        },
        error:function(){
            alert("erroryes")
        }
    });
}

showHistory(creatorId)

function myProfile(){
    document.getElementById("h11").innerHTML="Selamat Datang, "+creatorName
    document.getElementById("h22").innerHTML="No Id Karyawan : "+creatorId
    document.getElementById("h33").innerHTML="Jabatan : "+position
    document.getElementById("h44").innerHTML="Kode Jabatan : "+posisi
}
myProfile()


function showMyActivity(){
    $.ajax({
        url:'http://127.0.0.1:5000/comHistory',
        method:'GET',

        success:function(response){
            for (var j=0;j<response.data.length;j++){
                    
                if (creatorName==response.data[j].name){
                    var aktivitas =`
                    <tr>
                        <th>${response.data[j].record_id}</th>
                        <th>${response.data[j].name}</th>
                        <td>${response.data[j].position}</td>
                        <td>${response.data[j].created_at}</td>
                        <td>${response.data[j].completed_at}</td>
                        <td>${response.data[j].response}</td>
                        <td>${response.data[j].comment}</td>
                    </tr>
                    `
                    $('#tabelProfil').append(aktivitas);
                    document.getElementById("aktivitasku").style.display = "none";
                }
            }                              
        },
        error:function(){
            alert("erroryes")
        }
    });
}

showMyActivity()

function jurus1(){
    $("#tbProfil").slideToggle();
}