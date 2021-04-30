<template>
    <div>
        
        <form @submit.prevent="editProduct">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                        Product Name
                    </label>
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Product Name" v-model="product.Name">
                    
                </div>
                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                    Category
                    </label>
                    <div class="relative">
                        <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state" v-model="product.Category_id">
                          
                        <option  v-for="category in categories" :key="category.id" :value="category.id">{{ category.categoryName}}</option>
                       
                        </select>
                        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            
            </div>
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                    Description
                </label>
                <textarea class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Description" v-model="product.Description"></textarea>
                </div>
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                    Price
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city" type="text" v-model="product.Price">
                </div>
            </div>
           <div class="-mx-3 md:flex mb-2">
            
            
                <div class="md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
                    Image
                </label>
                <input type ="file" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="image" >
                </div>
                 <div class="md:w-1/2 px-3">
                   <button  type="submit" class="inline-flex items-center justify-center p-2 rounded-md text-white  bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" >Update Product</button>
                 </div>  
            </div>
        </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"; 
    import axios from 'axios';
    import config from "../../config.js";
    export default {
        props:{
            product:{
                type: Object,
                required: true
            }
        },
        computed:{
            ...mapGetters(['categories'])
        },
        methods:{
            editProduct()
            {
                 const formData = new FormData();
                formData.append('userId', this.$store.state.user.id)
                formData.append('id', this.product.id)
                formData.append('name', this.product.Name);
                formData.append('description', this.product.Description);
                formData.append('category', this.product.Category_id);
                formData.append('price', this.product.Price)
               
                formData.append('image', document.getElementById('image').files[0])
               
               
             axios
                .post(config.API_URL + "/editProduct", formData, {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    
                    if (data.status) {
                     
                        this.$router.push({ name: "Dashboard" });
                       
                       
                    } else {
                        this.name= ''
                        this.description =''
                        this.selectedcategory =''
                        this.price=0
                        document.getElementById('image').value =null
                    };

                });
            }
        }
       
      
        
    }
</script>

<style lang="scss" scoped>

</style>