
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": "system-ui",
        "--theme-font-family-heading": "system-ui",
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "9999px",
        "--theme-rounded-container": "8px",
        "--theme-border-base": "2px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "0 0 0",
        "--on-secondary": "0 0 0",
        "--on-tertiary": "0 0 0",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "0 0 0",
        "--on-surface": "0 0 0",
        // =~= Theme Colors  =~=
        // primary | #7bca3f 
        "--color-primary-50": "235 247 226", // #ebf7e2
        "--color-primary-100": "229 244 217", // #e5f4d9
        "--color-primary-200": "222 242 207", // #def2cf
        "--color-primary-300": "202 234 178", // #caeab2
        "--color-primary-400": "163 218 121", // #a3da79
        "--color-primary-500": "123 202 63", // #7bca3f
        "--color-primary-600": "111 182 57", // #6fb639
        "--color-primary-700": "92 152 47", // #5c982f
        "--color-primary-800": "74 121 38", // #4a7926
        "--color-primary-900": "60 99 31", // #3c631f
        // secondary | #c6d33c 
        "--color-secondary-50": "246 248 226", // #f6f8e2
        "--color-secondary-100": "244 246 216", // #f4f6d8
        "--color-secondary-200": "241 244 206", // #f1f4ce
        "--color-secondary-300": "232 237 177", // #e8edb1
        "--color-secondary-400": "215 224 119", // #d7e077
        "--color-secondary-500": "198 211 60", // #c6d33c
        "--color-secondary-600": "178 190 54", // #b2be36
        "--color-secondary-700": "149 158 45", // #959e2d
        "--color-secondary-800": "119 127 36", // #777f24
        "--color-secondary-900": "97 103 29", // #61671d
        // tertiary | #318731 
        "--color-tertiary-50": "224 237 224", // #e0ede0
        "--color-tertiary-100": "214 231 214", // #d6e7d6
        "--color-tertiary-200": "204 225 204", // #cce1cc
        "--color-tertiary-300": "173 207 173", // #adcfad
        "--color-tertiary-400": "111 171 111", // #6fab6f
        "--color-tertiary-500": "49 135 49", // #318731
        "--color-tertiary-600": "44 122 44", // #2c7a2c
        "--color-tertiary-700": "37 101 37", // #256525
        "--color-tertiary-800": "29 81 29", // #1d511d
        "--color-tertiary-900": "24 66 24", // #184218
        // success | #90f000 
        "--color-success-50": "238 253 217", // #eefdd9
        "--color-success-100": "233 252 204", // #e9fccc
        "--color-success-200": "227 251 191", // #e3fbbf
        "--color-success-300": "211 249 153", // #d3f999
        "--color-success-400": "177 245 77", // #b1f54d
        "--color-success-500": "144 240 0", // #90f000
        "--color-success-600": "130 216 0", // #82d800
        "--color-success-700": "108 180 0", // #6cb400
        "--color-success-800": "86 144 0", // #569000
        "--color-success-900": "71 118 0", // #477600
        // warning | #ff9d14 
        "--color-warning-50": "255 240 220", // #fff0dc
        "--color-warning-100": "255 235 208", // #ffebd0
        "--color-warning-200": "255 231 196", // #ffe7c4
        "--color-warning-300": "255 216 161", // #ffd8a1
        "--color-warning-400": "255 186 91", // #ffba5b
        "--color-warning-500": "255 157 20", // #ff9d14
        "--color-warning-600": "230 141 18", // #e68d12
        "--color-warning-700": "191 118 15", // #bf760f
        "--color-warning-800": "153 94 12", // #995e0c
        "--color-warning-900": "125 77 10", // #7d4d0a
        // error | #eb1000 
        "--color-error-50": "252 219 217", // #fcdbd9
        "--color-error-100": "251 207 204", // #fbcfcc
        "--color-error-200": "250 195 191", // #fac3bf
        "--color-error-300": "247 159 153", // #f79f99
        "--color-error-400": "241 88 77", // #f1584d
        "--color-error-500": "235 16 0", // #eb1000
        "--color-error-600": "212 14 0", // #d40e00
        "--color-error-700": "176 12 0", // #b00c00
        "--color-error-800": "141 10 0", // #8d0a00
        "--color-error-900": "115 8 0", // #730800
        // surface | #24a333 
        "--color-surface-50": "222 241 224", // #def1e0
        "--color-surface-100": "211 237 214", // #d3edd6
        "--color-surface-200": "200 232 204", // #c8e8cc
        "--color-surface-300": "167 218 173", // #a7daad
        "--color-surface-400": "102 191 112", // #66bf70
        "--color-surface-500": "36 163 51", // #24a333
        "--color-surface-600": "32 147 46", // #20932e
        "--color-surface-700": "27 122 38", // #1b7a26
        "--color-surface-800": "22 98 31", // #16621f
        "--color-surface-900": "18 80 25", // #125019

    }
}