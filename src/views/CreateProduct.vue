<template>
    <div>
        <form @submit.prevent="saveProduct">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                        Product Name
                    </label>
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Product Name" v-model="name">
                    <span class="text-red-500" v-if="!$v.name.required && $v.name.$dirty">Name is required</span>
                    <span class="text-red-500" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</span>
                    <span class="text-red-500" v-if="!$v.name.maxLength">Name can have atmost {{$v.name.$params.maxLength.max}} letters.</span>
                </div>
                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                    Category
                    </label>
                    <div class="relative">
                        <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state" v-model="selectedcategory">
                          
                        <option  v-for="category in categories" :key="category.id" :value="category.id">{{ category.categoryName}}</option>
                       
                        </select>
                        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                         <span class="text-red-500" v-if="!$v.selectedcategory.required && $v.selectedcategory.$dirty">Category is required</span>
                        </div>
                    </div>
                </div>
            
            </div>
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                    Description
                </label>
                <textarea class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Description" v-model="description"></textarea>
                 <span class="text-red-500" v-if="!$v.description.required &&  $v.description.$dirty">Description is required</span>
                    <span class="text-red-500" v-if="!$v.description.minLength">Description must have at least {{$v.description.$params.minLength.min}} letters.</span>
                    <span class="text-red-500" v-if="!$v.description.maxLength">Description can have atmost {{$v.description.$params.maxLength.max}} letters.</span>
                </div>
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                    Price
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city" type="text" v-model.number="price">
                <span class="text-red-500" v-if="!$v.price.required &&  $v.price.$dirty">Price is required</span>
                <span class="text-red-500" v-if="!$v.price.between">Must be between {{$v.price.$params.between.min}} and {{$v.price.$params.between.max}}</span>
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
                   <button  type="submit" class="inline-flex items-center justify-center p-2 rounded-md text-white  bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" >Create Product</button>
                 </div>  
            </div>
        </div>
        </form>
        <!-- component -->
        
    </div>
</template>

<script>
import config from "../../config.js"
import {
  required,
  minLength,
  maxLength,
  alpha,
  between
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex"; 
import axios from 'axios';
    export default {
        data()
        {
            return{
                name: '',
                description:'',
                selectedcategory: '',
                price: 0,
                error: null
               
            }
        },
        validations: {
             name: {
                required,
                alpha,
                minLength: minLength(3),
                maxLength: maxLength(100),
     
            },
            description:{
                required,
                minLength: minLength(6),
                maxLength: maxLength(200)
            },
            selectedcategory:{
                required
            },
            price:{
                required,
                between:between(0, 50000)
            }
        },
        computed:{
             ...mapGetters(['categories'])
        },
        methods:{
            saveProduct()
            {
                this.$v.$touch();
                 if (!this.$v.$invalid) {
                const formData = new FormData();
                formData.append('userId', this.$store.state.user.id)
                formData.append('name', this.name);
                formData.append('description', this.description);
                formData.append('category', this.selectedcategory);
                formData.append('price', this.price)
                formData.append('image', document.getElementById('image').files[0])
             axios
                .post(config.API_URL + "/storeProduct", formData, {
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


        
    }
</script>

<style lang="scss" scoped>

</style>