<template>
  <div class="row">
    <div class="col-12">
      <h3>Working...........</h3>
      <button class="btn btn-secondary button" @click="add">Add Row</button>
      <table class="table table-striped">
        <thead class="thead-dark">
          <draggable v-model="headers" tag="tr">
            <th v-for="header in headers" :key="header" scope="col">
              {{ header }}
            </th>
          </draggable>
        </thead>
        <draggable v-model="list" tag="tbody"> 
          <tr v-for="item in list" :key="item.name">
            <td v-for="(header, idx) in headers" :key="header"><input type="text" name="id" :id="idx" :value="item[header]"></td>
            <i class="fa fa-times close" @click="removeAt(idx)"></i>
          </tr>
        </draggable>
      </table>
    </div>

    <!-- <rawDisplayer class="col-3" :value="list" title="List" /> -->
  </div>
</template>

<script>
import draggable from "@/vuedraggable";
export default {
  name: "table-example",
  display: "Table",
  order: 8,
  components: {
    draggable
  },
  data() {
    return {
      headers: ["id", "name", "sport"], 
      list: [
        { id: 1, name: "anupam", sport: "basket" },
        { id: 2, name: "Brooke", sport: "foot" },
        { id: 3, name: "Courtenay", sport: "volley" },
        { id: 4, name: "David", sport: "rugby" }
      ],
      dragging: false
    };
  },
  methods:{
    removeAt(idx) {
      this.list.splice(idx, 1);
    },
    add: function() {
      const ids = this.list.map(object => {
        return object.id;
      });
      let maxID = Math.max(...ids);
      maxID++
      this.list.push({ id:maxID, name:"", sport: "" });
    }

  }
}; 
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}
.close {
  float: right;
  padding-top: 14px;
  padding-bottom: 8px;
}

</style>
