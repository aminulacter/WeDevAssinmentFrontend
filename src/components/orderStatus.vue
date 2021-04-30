<template>
    <div>
         <button  class="text-indigo-600 hover:text-indigo-900" 
         @click="show = true" v-if="!show">Edit</button>
         <div v-if="show">
         <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" 
         id="grid-state" v-model="status" 
         @change="updateOrder" @keydown.esc="show=false">
                          
            <option value="Processing" >Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
                       
         </select>
         </div>
    </div>
</template>

<script>
    export default {
        props: ['orderId', 'status'],
        
        data(){
            return{
                show: false,
                
            }
        },
        methods:{
            updateOrder(){
                this.$store.dispatch('updateOrders',{
                    orderId:this.orderId,
                    status : this.status
                })
                this.show = false
            }
        }

        
    }
</script>

<style lang="scss" scoped>

</style>