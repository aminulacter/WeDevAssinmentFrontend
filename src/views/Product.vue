<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white shadow overflow-hidden sm:rounded-lg">
 
  <div class="px-4 py-5 sm:px-6" >
    <h3 class="text-lg leading-6 font-medium text-gray-900">
      Product Information
    </h3>
   
  </div>
  <div class="border-t border-gray-200" v-if="product.id">
    <dl>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Product Name
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
         {{ product.Name}}
        </dd>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
         Category
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
         {{ categoryName(product.Category_id) }}
        </dd>
      </div>
       <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
         SKU
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {{product.SKU}}
        </dd>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
         Description
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {{product.Description}}
        </dd>
      </div>
      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500">
          Price
        </dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
         {{product.Price}}
        </dd>
      </div>
      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <div class="md:flex-shrink-0">
            <img class="h-48 w-full object-cover md:w-48 md:ml-24" :src="product.Image" :alt="product.Name">
         </div>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" v-if="!adminUser">
         <button  class="inline-flex items-center justify-center p-2 rounded-md text-white  bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" 
         @click="orderProduct(product.id)"
         >Order Product</button>
        </dd>
      </div>
      
    </dl>
  </div>
  <div v-else>
    <p class="text-red-500 text-center text-xl">product not found</p>
  </div>
</div>

</template>

<script>
    import { mapGetters } from "vuex"; 
       export default {
        props:{
            product:{
                type: Object,
                required: true
            }
        },
        computed:{
            ...mapGetters(['categoryName','adminUser'])
        },
        methods:{
          orderProduct(productId)
          {
            this.$store.dispatch('orderProduct', {
              productId: productId
            }).then(() => {
                  this.$router.push({ name: "orders" });
                })
          }
        }
       
      
        
    }
</script>

<style lang="scss" scoped>

</style>