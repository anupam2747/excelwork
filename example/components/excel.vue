<template>
  <div class="row">
    <div class="col-12">
      <h3>Working...........</h3>
      <button class="btn btn-secondary button" @click="add">Add Row</button>
      <table class="table table-striped table-responsive" :tbody-tr-class="rowClass">
        <thead class="thead-dark">
          <draggable v-model="headers" tag="tr">
            <th v-for="(header, index) in headers" :key="header" scope="col" :headerindex="index">
              {{ header }}
            </th>
          </draggable>
        </thead>
        <draggable v-model="list" tag="tbody"> 
          <tr v-for="item in list" :key="item.id">
            <td v-for="(header, idx) in headers" :key="header">
               <span v-if="(item[header]) == 'true'">
                <input type="checkbox" :id="idx" :checked="true" :data-id="item.id" :data-value="item[header]" :columnname="header" @click="updatecheckboxColumnValue">
                </span>
                <span v-else-if="(item[header]) == 'false'">
                  <input type="checkbox" :id="idx" :checked="false" :data-id="item.id" :data-value="item[header]" :columnname="header" @click="updatecheckboxColumnValue">
                  </span>
                <span v-else>
                  <input type="text" :id="idx" :value="item[header]" :data-id="item.id" :data-value="item[header]" :columnname="header" @input="onInput">
               </span>
            </td>
            <!-- <i class="fa fa-times close" @click="removeAt(idx)"></i> -->
          </tr>
        </draggable>
      </table>  
    </div> 

    <rawDisplayer class="col-3" :value="list" title="List" />
    <rawDisplayer class="col-3" :value="headers" title="header" />
  </div>
</template>

<script>

import draggable from "@/vuedraggable";
import "vuetify/dist/vuetify.min.css";
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios,axios);
export default {
  name: "table-example",
  display: "Table",
  order: 8,
  components: {
    draggable,
  },
  data() { 
    return {
      headers: undefined,
      list:undefined,
      dragging: false,
      responsemsg:''
    };
  },
  methods:{
    // removeAt(idx) {
    //   this.list.splice(idx, 1);
    // },
    updatecheckboxColumnValue:async function(e){
     var columnname = e.currentTarget.getAttribute('columnname');
     var dataValue = e.currentTarget.getAttribute('data-value');
     var dataId= e.currentTarget.getAttribute('data-id');
     var checkbox = 'checkbox';
     await Vue.axios.post("https://codeyiizen.com/dev/excelapi/api/excel/listPostData",{name:columnname,value:dataValue,id:dataId,checkboxvalue:checkbox})
     .then(resp=>{
      console.log(resp);
     });

    },

    add: function() {
      const ids = this.list.map(object => {
        return object.id;
      });
      let maxID = Math.max(...ids);
      maxID++;
      // this.list.push({ id:maxID, name:"", sport: "" });
      this.list.push({ id:maxID, name:"", sport: "", });
    },

    async onInput(e){
      // console.log(e.target.value)
      var columnname = e.currentTarget.getAttribute('columnname');
     var dataValue = e.target.value;
     var dataId= e.currentTarget.getAttribute('data-id');
     var checkbox = 'inputbox';
     await Vue.axios.post("https://codeyiizen.com/dev/excelapi/api/excel/listPostData",{name:columnname,value:dataValue,id:dataId,checkboxvalue:checkbox})
     .then(resp=>{
      console.log(resp);
     });

    }
  },
  mounted(){
     Vue.axios.get("https://codeyiizen.com/dev/excelapi/api/excel/listExceldata")
     .then(resp=>{
      this.list = resp.data.result;
     }),
     Vue.axios.get("https://codeyiizen.com/dev/excelapi/api/excel/listheader")
     .then(resp=>{
      this.headers = resp.data.result;
     })
  }
};
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
 /* eslint-disable */
.close {
  float: right;
  padding-top: 14px;
  padding-bottom: 8px;
}
</style>
