import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  dbUrl: string = "https://schooldb-d4d33-default-rtdb.europe-west1.firebasedatabase.app/"
  putTable(tabella:string,id:string,body:{}){
    return this.http.put(this.dbUrl+tabella+'/'+id+'.json',body)
  }
  saving(){
    this.putTable('utenti/'+this.dbUserEmail,this.idUtente,this.datiUtente).subscribe()
  }

  constructor(public r:Router,public http:HttpClient){}
  
  userEmail:any
  dbUserEmail:any
  datiUtente:any = {}
  idUtente:any 

  aggiuntaAttiva:any = {
    flowchart:false,
    staff:false,
    professors:false,
    classes:false,
    profilo:false,
    expenses:false,
    clubs:false,
    trips:false,
    outgoings:false
  }

  idModifica:any= {
    flowchart:null,
    staff:null,
    professors:null,
    classes:null,
    profilo:null,
    expenses:null,
    clubs:null,
    trips:null,
    outgoings:null
  }
  modificaAttiva:any = {
    flowchart:false,
    staff:false,
    professors:false,
    classes:false,
    profilo:false,
    expenses:false,
    clubs:false,
    trips:false,
    outgoings:false
  }

  idProfiloView:any = {
    flowchart:null,
    staff:null,
    professors:null,
    classes:null,
    profilo:null,
    expenses:null,
    clubs:null,
    trips:null,
    outgoings:null
  }


  contraryDeleting(k:string,id:number){
    this.datiUtente[k][id].deleting = !this.datiUtente[k][id].deleting
    this.updateHeader()
    this.saving()
  }

  updateRefOnAdd(f:NgForm,parteForm:string,int:string,ext:string,vuoto:boolean){
    if(f.value[parteForm] && f.value[parteForm].length !== 0){
      if(vuoto){
        f.value[parteForm].forEach((item:any)=>{
          if(!(this.datiUtente[ext][item][int])){
            this.datiUtente[ext][item][int] = [0]
          }else if(this.datiUtente[ext][item][int].length === 0){
            this.datiUtente[ext][item][int] = [0]
          }else{
            this.datiUtente[ext][item][int] = [0]
          }
        })
      }else{
        f.value[parteForm].forEach((item:any)=>{
          if(!(this.datiUtente[ext][item][int])){
            this.datiUtente[ext][item][int] = [this.datiUtente[int].length - 1]
          }else if(this.datiUtente[ext][item][int].length === 0){
            this.datiUtente[ext][item][int] = [this.datiUtente[int].length - 1]
          }else{
            if(parteForm == 'studenti' && int == 'classes' && ext == 'students' && vuoto == false){
              if(this.datiUtente['classes'] && this.datiUtente['classes'].length){
                this.datiUtente['classes'].forEach((c:any)=>{
                  if(c){
                    if(c.id != this.datiUtente[int].length - 1){
                      if(c['students'] && c['students'].length > 0){
                        if(c['students'].includes(item)){
                          this.datiUtente['classes'][c.id]['students'] = this.datiUtente['classes'][c.id]['students'].filter((i:any)=>{return i != item})
                        }
                      }
                    }
                  }
                })
              }
              this.datiUtente[ext][item][int] = [this.datiUtente[int].length - 1]
            }else{
              this.datiUtente[ext][item][int].push(this.datiUtente[int].length - 1)
            }
          }
        })
      }
    }
  }
  updateRefOnAddNonMultipleSelect(f:NgForm,parteForm:string,int:string,ext:string,vuoto:boolean){
    if(f.value[parteForm] !== undefined && f.value[parteForm] !== null && f.value[parteForm] !== ""){
      if(vuoto){
        if(!this.datiUtente[ext][f.value[parteForm]][int]){
          this.datiUtente[ext][f.value[parteForm]][int] = [0]
        }
        else if(this.datiUtente[ext][f.value[parteForm]][int].length === 0){
          this.datiUtente[ext][f.value[parteForm]][int] = [0]
        }else{
          this.datiUtente[ext][f.value[parteForm]][int] = [0]
        }
      }else{
        if(!this.datiUtente[ext][f.value[parteForm]][int]){
          this.datiUtente[ext][f.value[parteForm]][int] = [this.datiUtente[int].length - 1]
        }
        else if(this.datiUtente[ext][f.value[parteForm]][int].length === 0){
          this.datiUtente[ext][f.value[parteForm]][int] = [this.datiUtente[int].length - 1]
        }
        else{
          this.datiUtente[ext][f.value[parteForm]][int].push(this.datiUtente[int].length - 1)
        }
      }
    }
  }

  updateRefOnMod(id:number,int:string,ext:string){
    if(this.datiUtente[int][id][ext] && this.datiUtente[int][id][ext].length > 0){
        this.datiUtente[int][id][ext].forEach((c:any)=>{
          if(c || c == 0){
          if(this.datiUtente[ext][c][int] && this.datiUtente[ext][c][int].length > 0){
            if(this.datiUtente[ext][c][int].includes(id)){}else{
              if(int == 'classes' && ext == 'students'){
                this.datiUtente[ext][c][int] = [id]
              }else{
                this.datiUtente[ext][c][int].push(id)
                this.updateHeader()
                this.saving()
              }
            }
          }else{
            this.datiUtente[ext][c][int] = [id]
            this.updateHeader()
            this.saving()
          }
          }
        })
        if(this.datiUtente[ext] && this.datiUtente[ext].length > 0){
          this.datiUtente[ext].forEach((item:any)=>{
            if(item){
              if(item[int] && item[int].length > 0){
                if(item[int].includes(id) && !(this.datiUtente[int][id][ext].includes(item.id))){
                  this.datiUtente[ext][item.id][int] = this.datiUtente[ext][item.id][int].filter((i:any)=>{return i != id})
                  this.updateHeader()
                  this.saving()
                }
              }
            }
          })
        }
    }else{
      if(this.datiUtente[ext] && this.datiUtente[ext].length > 0){
        this.datiUtente[ext].forEach((item:any)=>{
            if(item){
              if(item[int] && item[int].length > 0){
                if(item[int].includes(id)){
                  this.datiUtente[ext][item.id][int] = this.datiUtente[ext][item.id][int].filter((i:any)=>{return i != id})
                  this.updateHeader()
                  this.saving()
                }
              } 
            }
          })
        }
      }
    
  }

  updateRefOnEl(id:number,int:string,ext:string){
    if(this.datiUtente[ext] && this.datiUtente[ext].length > 0){
      this.datiUtente[ext].forEach((item:any)=>{
        if(item){
          if(item[int] && item[int].length > 0){
            if(item[int].includes(id)){
              if(int == 'classes' && ext == 'students'){
                this.datiUtente[ext][item.id][int] = this.datiUtente[ext][item.id][int].filter((i:any)=>{return i != id})
                this.datiUtente[ext][item.id].assignedClass = 'no'
              }else{
                this.datiUtente[ext][item.id][int] = this.datiUtente[ext][item.id][int].filter((i:any)=>{return i != id})
              }
              this.updateHeader()
              if(this.header[int] && this.header[int].length > 0){
                let l:any = this.header[int].length
                if(l == 6){
                  this.pages[int] = 1
                }
              }
              this.saving()
            }
          }
        }
      })
    }
  }

  header:any = {}
  updateHeader(){
    const chiavi:string[] = ['flowchart','classes','clubs','trips','staff','professors','expenses','students','outgoings']
    chiavi.forEach((k:any)=>{
      this.header[k] = this.datiUtente[k]? this.datiUtente[k].filter((i:any)=>{return i != null && i != undefined}) : []
    })
  }
  delete(k:string,id:number){
    if(this.idProfiloView[k] == id || this.idModifica[k] == id){
      this.r.navigate(['/'+k])
      this.idProfiloView[k] = null
      this.idModifica[k] = null
      this.modificaAttiva[k] = false
    }
    this.datiUtente[k][id] = null
    this.updateHeader()
    this.saving()
  }

  pages:any = {
    flowchart:1,
    staff:1,
    professors:1,
    classes:1,
    students:1,
    expenses:1,
    clubs:1,
    trips:1,
    outgoings:1
  }
  
  catchKeys(headerKey:string,elemKey:string){
    let keyArray:any = []
    this.header[headerKey].forEach((i:any)=>{
      keyArray.push(i[elemKey])
    })
    return keyArray
  }
  catchElems(headerKey:string,elemKey:string,elemKeyValues:any[],single:boolean){
    let resultArray:any
    resultArray = this.header[headerKey].filter((i:any)=>{return elemKeyValues.includes(i[elemKey])})
    if(resultArray.length == 0){
      return 'no result'
    }else if(single == true && resultArray.length == 1){
      return resultArray[0]
    }else{
      return resultArray
    }
  }

  movePagination(k:string){
    this.pages[k] = Math.floor(this.header[k].length/6) == this.header[k].length/6 ? this.header[k].length/6 : Math.floor(this.header[k].length/6) + 1
  }
  changePage(k:string,n:number){
    this.pages[k] = n
  }
  pagOptions(n:number){
    let i
    let pagOptions = []
    for(i=1;i<=n;i++){
      pagOptions.push(i)
    }
    return pagOptions
  }
  lastPage(k:string){
    return Math.floor(this.header[k].length/6) == this.header[k].length/6 ? this.header[k].length/6 : Math.floor(this.header[k].length/6) + 1
  }
  firstPage(f:any,k:string){
    const n = 1
    this.pages[k] = n
    f.value = n
  }
  previousPage(f:any,k:string){
    const n = this.pages[k] == 1? 1 : this.pages[k] - 1
    this.pages[k] = n
    f.value = n
  }
  nextPage(f:any,k:string){
    const n = this.pages[k] == this.lastPage(k)? this.lastPage(k) : this.pages[k] + 1
    this.pages[k] = n
    f.value = n
  }
  lastPageS(f:any,k:string){
    const n = this.lastPage(k)
    this.pages[k] = n
    f.value = n
  }
}
