<template>
    <div>
          <h2>List of Orders</h2>
        <div class="flex flex-col">

       
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Image
                    </th>
                   
                     <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                    </th>
                     <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        status
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                     v-if="adminUser">
                        Action
                    </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    
                    <tr v-for="order in orders" :key="order.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                        
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">
                             {{order.user}}
                            </div>
                           
                        </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-left">
                        <div class="text-sm text-gray-900">{{ order.product }}</div>
                        
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-left">
                        <div class="flex-shrink-0 h-10 w-10">
                            <img class="h-10 w-10 rounded-full" :src="order.Image" alt="">
                        </div>
                        
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-left">
                        <div class="text-sm text-gray-900">{{ order.Price }}</div>
                        
                    </td>
                     <td class="px-6 py-4 whitespace-nowrap text-left">
                        <div class="text-sm text-gray-900">{{ order.status }}</div>
                        
                    </td>
                    
                        <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium text-left"  v-if="adminUser">
                            <order-status :orderId="order.id" :status="order.status"/>
                        </td>
                    </tr>

                   
                </tbody>
                </table>
            </div>
            </div>
        </div>
        
        
        </div>
    </div>
</template>

<script>
    
    import {mapGetters} from "vuex";
import orderStatus from '../components/orderStatus.vue';
    export default {
  components: { orderStatus },
        data()
        {
            return{
                selectedCategory: null,

            }
        },
       

         computed: {
           
             ...mapGetters(["loggedIn", "orders", "adminUser"])
        },
        mounted()
        {
            this.$store.dispatch('fetchOrders')
        },
    }
</script>

<style lang="scss" scoped>

</style>