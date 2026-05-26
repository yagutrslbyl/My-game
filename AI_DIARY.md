### [26 may] - Gəmi vizualının sabun köpüyü effektindən təmizlənməsi

**What I asked the AI:**
Narıncı gövdə çox kobud göründü, onu silib sadəcə gəmi emojisinin qalmasını istədim.

**What it gave me:**
`.player` klassından background-color və border-radius elementlərini silərək transparent etdi, emojinin ölçüsünü font-size ilə tənzimlədi.

**What was wrong:**
Əvvəlki CSS həm dördbucaqlını gəmiyə bənzətməyə çalışırdı, həm də üzərinə emoji qoyurdu. Bu iki vizual üst-üstə düşəndə çox kobud bir görüntü yaranmışdı.

**How I fixed it:**
Gəmi elementinin fonunu tamamilə şəffaf etdim. JS tərəfində gəminin toqquşma və hərəkət hüdudlarını təyin edən width və height dəyişənlərini emojinin yeni ölçülərinə (40x40) uyğunlaşdırdım.

**Time lost:** ~5 minutes

