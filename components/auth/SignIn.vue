<template>
  <div class="grid mx-auto max-w-sm gap-6">
    <div class="grid gap-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">
        Welcome Back
      </h1>
      <p class="text-balance text-sm text-muted-foreground">
        Login with your Wechat account
      </p>
    </div>
    <form class="grid gap-6 select-none" @submit="onSubmit">
      <div class="flex flex-col gap-4">
        <!-- <Button variant="outline" class="w-full gap-2">
        <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
            fill="currentColor" />
        </svg>
        Login with Github
      </Button> -->
        <Button variant="outline" class="w-full gap-2">
          <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M23.541 12.748c-.609-1.38-1.758-2.476-3.092-3.151-2.354-1.192-5.281-1.185-7.629.03-1.631.837-2.993 2.337-3.379 4.162-.318 1.344-.033 2.791.68 3.961 1.061 1.762 2.979 2.887 4.971 3.248 1.443.293 2.936.119 4.338-.285.842.326 1.592.854 2.408 1.246-.211-.707-.436-1.406-.676-2.102.916-.65 1.746-1.461 2.244-2.479.744-1.415.789-3.171.135-4.63zm-9.924-9.466c-2.495-1.404-5.602-1.615-8.286-.645-1.764.635-3.36 1.815-4.346 3.42-.895 1.45-1.23 3.258-.799 4.917.433 1.84 1.711 3.383 3.262 4.413-.3.85-.585 1.699-.855 2.555.975-.51 1.95-1.043 2.926-1.561 1.17.375 2.415.559 3.66.518-.33-.943-.405-1.965-.255-2.951.225-1.371.975-2.625 1.994-3.554 1.726-1.615 4.171-2.296 6.496-2.131-.436-2.135-1.936-3.939-3.824-4.98h.027zm1.733 9.989c-.209.652-1.156.848-1.615.352-.506-.459-.309-1.418.355-1.623.734-.31 1.582.537 1.26 1.271zm4.795.092c-.256.586-1.141.723-1.576.27-.209-.191-.27-.479-.344-.73.104-.458.42-.933.93-.955.705-.098 1.336.773.975 1.416h.015zM12.99 6.909c.008.961-1.275 1.561-1.995.909-.747-.535-.535-1.837.342-2.106.785-.315 1.713.344 1.651 1.185l.002.012zm-6.059.244c-.172.835-1.291 1.238-1.946.678-.759-.535-.546-1.861.345-2.131.873-.336 1.865.55 1.601 1.453z"
              fill="currentColor" />
          </svg>
          Login with Wechat
        </Button>
      </div>
      <Separator label="Or continue with" />
      <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
        <FormItem v-auto-animate>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="text" placeholder="name@example.com" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
        <FormItem v-auto-animate>
          <div class="flex items-center">
            <FormLabel>Password</FormLabel>
            <I18nLink to="/forgot-password" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </I18nLink>
          </div>
          <FormControl>
            <PasswordInput v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, value }" name="captchaCode" :validate-on-blur="!isFieldDirty">
        <FormItem v-auto-animate>
          <div class="flex items-center">
            <FormLabel class="grow">Code</FormLabel>
            <div class="cursor-pointer" v-html="captcha.data" @click="onRefreshCaptcha"></div>
            <FormControl>
              <PinInput :model-value="value" :name="componentField.name" @update:model-value="(arrStr: any[]) => {
                setFieldValue('captchaCode', arrStr.filter(Boolean))
              }">
                <PinInputGroup>
                  <PinInputInput v-for="(id, index) in 4" :key="id" :index="index" />
                </PinInputGroup>
              </PinInput>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="w-full" :disabled="isLoading">
        <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
        Login
      </Button>
    </form>
    <div class="mt-4 text-center text-sm text-muted-foreground">
      Don't have an account?
      <I18nLink to="/register" class="underline">
        Sign up
      </I18nLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { useToast } from '~/components/ui/toast'
import { useUserStore } from '~/store'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'


const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  captchaId: z.string().length(20),
  captchaCode: z.array(z.coerce.string()).length(4, { message: 'Invalid input' })
}))

const { isFieldDirty, handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
})

const captcha = ref<any>({})
const onRefreshCaptcha = async () => {
  const { data } = await useFetch<any>('/api/v1/captcha')
  captcha.value = data.value?.data
  setFieldValue('captchaId', captcha.value?.id)
}
onRefreshCaptcha()

const { $switchRoute } = useI18n()
const userStore = useUserStore()
const { toast } = useToast()
const isLoading = ref(false)

const onSubmit = handleSubmit(async (values: any) => {
  isLoading.value = true
  const params = {
    ...values,
    captchaCode: values.captchaCode.join(''),
  }
  const { data } = await useFetch<any>('/api/v1/sys/login', {
    headers: { accept: 'application/json' },
    method: 'POST',
    body: params
  })
  const { status, message } = data.value || {}
  if (status !== 200) {
    return setTimeout(() => {
      toast({
        title: 'Uh oh！ （✘﹏✘ა）',
        description: message,
        variant: 'destructive',
        duration: 3000,
      });
      onRefreshCaptcha()
      isLoading.value = false
    }, 300);
  } else {
    userStore.login(data.value.data)
    setTimeout(() => {
      $switchRoute('/')
      isLoading.value = false
    }, 300)
  }
})


</script>


<style scoped></style>
