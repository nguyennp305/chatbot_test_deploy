<script setup lang="ts">
/*Call Components*/
import RecentTransaction from '@/components/dashboard/RecentTransaction.vue';
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <!-- Recent transaction -->
                <v-col cols="12" lg="4">
                    <RecentTransaction />
                </v-col>
               
            </v-row>
        </v-col>
    </v-row>
</template>