<template>
  <div ref="profileCard" class="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl shadow-2xl text-white space-y-4"/>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'

// 定义props
const props = defineProps({
  profileData: {
    type: Object,
    required: true
  }
})

const profileCard = ref(null)
let cardData = ref({})

// 更新卡片数据
const updateCardData = async(data) => {
  cardData = data
  await nextTick()
  renderProfile()
}

// 渲染个人信息卡片
const renderProfile = () => {
  if(!profileCard.value) return

  profileCard.value.innerHTML = `
    <!-- Avatar -->
    <div class="flex items-center space-x-4">
      <img src="${cardData.avatar}" alt="头像" class="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md" />
      <div>
        <h2 class="text-2xl font-bold">${cardData.name}</h2>
        <p class="text-sm text-blue-300">微信昵称：${cardData.wxName}</p>
      </div>
    </div>

    <!-- Basic Info -->
    <div class="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-white/20">
      <div><span>性别：</span>${cardData.gender}</div>
      <div><span>年龄：</span>${cardData.age}</div>
      <div><span>手机号：</span>${cardData.phone}</div>
      <div><span>邮箱：</span>${cardData.email}</div>
      <div class="col-span-2"><span>身份证号：</span>${cardData.idCard}</div>
      <div><span>归属地：</span>${cardData.location}</div>
      <div><span>常住城市：</span>${cardData.city}</div>
      <div class="col-span-2"><span class="text-gray-300">收货地址：</span>${cardData.address}</div>
    </div>

    <!-- 第三方账号 -->
    <div class="pt-4 border-t border-white/20">
      <p class="text-sm text-gray-300 mb-1">第三方账号昵称：</p>
      <ul class="list-disc list-inside space-y-1 text-sm">
        ${cardData.socialAccounts?.map(account => `<li>${account.platform}：${account.name}</li>`).join('')}
      </ul>
    </div>
  `
}

// 组件挂载时初始化
onMounted(async() => {
  await updateCardData(props.profileData)
})

// 监听数据变化
watch(() => props.profileData, () => {
  updateCardData(props.profileData)
}, { deep: true })
</script>
