<template>
  <div class="demo-page q-pa-lg">
    <!-- Header Card -->
    <base-card class="q-mb-lg">
      <h1 class="text-h4 text-weight-bold text-grey-8 q-mb-sm">NetToolsKit UI Vue - Design System Demo</h1>
      <p class="text-body1 text-grey-7">
        Showcase of all shared components, composables, and design tokens.
        Copy this file to your project to test components.
      </p>
    </base-card>

    <!-- Navigation -->
    <base-card class="q-mb-lg">
      <q-btn-toggle
        v-model="activeSection"
        spread
        no-caps
        unelevated
        toggle-color="primary"
        text-color="grey-8"
        :options="sectionOptions"
      />
      
      <!-- Section Headers -->
      <div class="q-mt-lg">
        <section-header 
          v-for="section in sectionOptions" 
          :key="section.value"
          v-show="activeSection === section.value" 
          :title="section.title" 
          :subtitle="section.subtitle" 
        />
      </div>
    </base-card>

    <!-- ============================================================================ -->
    <!-- THEME SECTION -->
    <!-- ============================================================================ -->
    <div v-show="activeSection === 'theme'" class="animate-section">
      <div class="row q-col-gutter-lg q-mb-lg">
        <!-- Theme Switcher -->
        <div class="col-12 col-md-6">
          <base-card>
            <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">useTheme</h3>
            <p class="text-body2 text-grey-7 q-mb-md">
              Composable for theme management and runtime switching.
            </p>
            
            <div class="q-gutter-sm q-mb-md">
              <base-button 
                v-for="themeName in availableThemes" 
                :key="themeName"
                :variant="currentThemeName === themeName ? 'primary' : 'secondary'"
                @click="setTheme(themeName)"
              >
                {{ themeName }}
              </base-button>
            </div>
            
            <div class="text-body2 q-mb-md">
              <p><strong>Current Theme:</strong> {{ currentThemeName }}</p>
              <p><strong>Primary Color:</strong> {{ primaryColor }}</p>
              <p><strong>Is Dark:</strong> {{ isDark }}</p>
            </div>
            
            <pre class="code-block">// Import
import { useTheme, initTheme } from '@shared'

// Initialize on app startup
initTheme('sentinela')

// Use in components
const { 
  theme, 
  themeName, 
  primaryColor, 
  isDark,
  setTheme 
} = useTheme()

// Switch themes
setTheme('platea')
setTheme('dark')</pre>
          </base-card>
        </div>

        <!-- Theme Colors -->
        <div class="col-12 col-md-6">
          <base-card>
            <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">Theme Colors</h3>
            <p class="text-body2 text-grey-7 q-mb-md">
              Current theme color palette.
            </p>
            
            <div class="row q-gutter-sm">
              <div v-for="(color, name) in themeColors" :key="name" class="col-auto">
                <div class="text-center">
                  <div 
                    class="color-swatch q-mb-xs" 
                    :style="{ backgroundColor: color }"
                  ></div>
                  <div class="text-caption text-grey-7">{{ name }}</div>
                </div>
              </div>
            </div>
            
            <pre class="code-block q-mt-md">/* CSS Variables (set by theme) */
--theme-primary: {{ theme?.colors?.primary }};
--theme-background: {{ theme?.colors?.background }};
--theme-text: {{ theme?.colors?.text }};

/* Usage in CSS */
.my-element {
  color: var(--theme-primary);
  background: var(--theme-background);
}</pre>
          </base-card>
        </div>
      </div>
    </div>

    <!-- ============================================================================ -->
    <!-- COMPOSABLES SECTION -->
    <!-- ============================================================================ -->
    <div v-show="activeSection === 'composables'" class="animate-section">
      <div class="row q-col-gutter-lg q-mb-lg">
        <!-- useNotification -->
        <div class="col-12 col-md-6">
          <base-card>
            <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">useNotification</h3>
            <p class="text-body2 text-grey-7 q-mb-md">
              Composable for toast notifications (success, error, warning, info).
            </p>
            <div class="q-gutter-sm">
              <base-button variant="primary" @click="success('Operation completed successfully!')">
                Success
              </base-button>
              <base-button variant="secondary" @click="error('Error processing request')">
                Error
              </base-button>
              <base-button variant="primary" @click="warning('Warning: unsaved changes')">
                Warning
              </base-button>
              <base-button variant="secondary" @click="info('Important information')">
                Info
              </base-button>
            </div>
            <pre class="code-block q-mt-md">import { useNotification } from '@shared'

const { success, error, warning, info } = useNotification()

success('Operation completed!')
error('Something went wrong')
warning('Please review your data')
info('New update available')</pre>
          </base-card>
        </div>

        <!-- useDialog -->
        <div class="col-12 col-md-6">
          <base-card>
            <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">useDialog</h3>
            <p class="text-body2 text-grey-7 q-mb-md">
              Composable for managing modal/dialog state.
            </p>
            <base-button variant="primary" @click="dialog.toggle()">
              Toggle Dialog
            </base-button>
            <p class="text-body2 q-mt-sm">
              State: <strong>{{ dialog.isOpen.value ? 'Open' : 'Closed' }}</strong>
            </p>
            <pre class="code-block q-mt-md">import { useDialog } from '@shared'

const dialog = useDialog()
const confirmDialog = useDialog({ 
  onClose: () => console.log('Closed') 
})

dialog.open()
dialog.close()
dialog.toggle()</pre>
          </base-card>
        </div>

        <!-- useResponsive -->
        <div class="col-12 col-md-6">
          <base-card>
            <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">useResponsive</h3>
            <p class="text-body2 text-grey-7 q-mb-md">
              Composable for responsive breakpoint detection.
            </p>
            <div class="text-body2">
              <p><strong>isMobile:</strong> {{ isMobile }}</p>
              <p><strong>isDesktop:</strong> {{ isDesktop }}</p>
              <p><strong>currentBreakpoint:</strong> {{ currentBreakpoint }}</p>
            </div>
            <pre class="code-block q-mt-md">import { useResponsive } from '@shared'

const { isMobile, isDesktop, currentBreakpoint } = useResponsive()

if (isMobile) {
  // Mobile layout
}

if (isDesktop) {
  // Desktop layout
}</pre>
          </base-card>
        </div>

        <!-- useDebounce -->
        <div class="col-12 col-md-6">
          <base-card>
            <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">useDebounce</h3>
            <p class="text-body2 text-grey-7 q-mb-md">
              Composable for debounced search inputs.
            </p>
            <base-input
              v-model="searchTerm"
              label="Type to search"
              @update:model-value="handleDebouncedSearch"
            />
            <p class="text-body2 q-mt-sm">
              Last search: <strong>{{ lastSearch || 'none' }}</strong>
            </p>
            <pre class="code-block q-mt-md">import { useDebounce } from '@shared'

const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 300)

watch(debouncedQuery, (query) => {
  fetchSearchResults(query)
})</pre>
          </base-card>
        </div>

        <!-- useFormRules -->
        <div class="col-12 col-md-6">
          <base-card>
            <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">useFormRules</h3>
            <p class="text-body2 text-grey-7 q-mb-md">
              Composable for form validation rules.
            </p>
            <div class="text-body2 q-mb-md">
              <p><strong>Available rules:</strong></p>
              <ul>
                <li>rules.required</li>
                <li>rules.email</li>
                <li>rules.minLength(n)</li>
                <li>rules.maxLength(n)</li>
                <li>rules.numeric</li>
                <li>rules.cpf</li>
                <li>rules.cnpj</li>
              </ul>
            </div>
            <pre class="code-block">import { useFormRules } from '@shared'

const { rules, emailRules, cpfRules } = useFormRules()

// Use in BaseInput
&lt;base-input
  v-model="email"
  label="Email"
  :rules="emailRules"
/&gt;</pre>
          </base-card>
        </div>

        <!-- useAsync -->
        <div class="col-12 col-md-6">
          <base-card>
            <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">useAsync</h3>
            <p class="text-body2 text-grey-7 q-mb-md">
              Composable for async operation handling with loading/error states.
            </p>
            <pre class="code-block">import { useAsync } from '@shared'

const { execute, loading, error, data } = useAsync(
  async (id: string) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  }
)

// Execute the async function
await execute('user-123')

// Use in template
&lt;q-spinner v-if="loading" /&gt;
&lt;div v-else-if="error"&gt;{{ error.message }}&lt;/div&gt;
&lt;UserCard v-else :user="data" /&gt;</pre>
          </base-card>
        </div>
      </div>
    </div>

    <!-- ============================================================================ -->
    <!-- BUTTONS SECTION -->
    <!-- ============================================================================ -->
    <div v-show="activeSection === 'buttons'" class="animate-section">
      <div class="row q-col-gutter-md q-mb-lg">
        <!-- Primary Button -->
        <div class="col-12 col-md-3">
          <base-card>
            <div class="text-center">
              <p class="text-subtitle2 text-weight-medium q-mb-md text-grey-8">Primary</p>
              <base-button variant="primary" @click="success('Primary clicked!')">
                Click Here
              </base-button>
            </div>
          </base-card>
        </div>

        <!-- Secondary Button -->
        <div class="col-12 col-md-3">
          <base-card>
            <div class="text-center">
              <p class="text-subtitle2 text-weight-medium q-mb-md text-grey-8">Secondary</p>
              <base-button variant="secondary" @click="info('Secondary clicked!')">
                Click Here
              </base-button>
            </div>
          </base-card>
        </div>

        <!-- Full Width -->
        <div class="col-12 col-md-3">
          <base-card>
            <div class="text-center">
              <p class="text-subtitle2 text-weight-medium q-mb-md text-grey-8">Full Width</p>
              <base-button variant="primary" full-width>
                Full Width
              </base-button>
            </div>
          </base-card>
        </div>

        <!-- Disabled -->
        <div class="col-12 col-md-3">
          <base-card>
            <div class="text-center">
              <p class="text-subtitle2 text-weight-medium q-mb-md text-grey-8">Disabled</p>
              <base-button variant="primary" :disabled="true">
                Disabled
              </base-button>
            </div>
          </base-card>
        </div>
      </div>

      <!-- BaseChip -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-3">
          <base-card>
            <div class="text-center">
              <p class="text-subtitle2 text-weight-medium q-mb-md text-grey-8">Default Chip</p>
              <base-chip variant="default" @click="success('Default chip clicked!')">
                Click Here
              </base-chip>
            </div>
          </base-card>
        </div>

        <div class="col-12 col-md-3">
          <base-card>
            <div class="text-center">
              <p class="text-subtitle2 text-weight-medium q-mb-md text-grey-8">Primary Chip</p>
              <base-chip variant="primary" @click="success('Primary chip clicked!')">
                Click Here
              </base-chip>
            </div>
          </base-card>
        </div>

        <div class="col-12 col-md-3">
          <base-card>
            <div class="text-center">
              <p class="text-subtitle2 text-weight-medium q-mb-md text-grey-8">Selected</p>
              <base-chip variant="default" :selected="true">
                Selected
              </base-chip>
            </div>
          </base-card>
        </div>

        <div class="col-12 col-md-3">
          <base-card>
            <div class="text-center">
              <p class="text-subtitle2 text-weight-medium q-mb-md text-grey-8">Disabled</p>
              <base-chip variant="default" :disabled="true">
                Disabled
              </base-chip>
            </div>
          </base-card>
        </div>
      </div>

      <!-- Button Documentation -->
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <info-card
            title="BaseButton"
            subtitle="Primary and secondary button variants"
            icon="smart_button"
            icon-color="#1976d2"
          >
            <pre class="code-block">import { BaseButton } from '@shared'

&lt;base-button variant="primary" @click="handleClick"&gt;
  Click Me
&lt;/base-button&gt;

&lt;base-button variant="secondary" full-width&gt;
  Secondary Action
&lt;/base-button&gt;

&lt;base-button variant="primary" :disabled="loading"&gt;
  Submit
&lt;/base-button&gt;</pre>
          </info-card>
        </div>

        <div class="col-12 col-md-6">
          <info-card
            title="BaseChip"
            subtitle="Tag/chip elements for selection"
            icon="label"
            icon-color="#4caf50"
          >
            <pre class="code-block">import { BaseChip } from '@shared'

&lt;base-chip variant="default" @click="handleClick"&gt;
  Tag Name
&lt;/base-chip&gt;

&lt;base-chip variant="primary" :selected="isSelected"&gt;
  Selected Tag
&lt;/base-chip&gt;</pre>
          </info-card>
        </div>
      </div>
    </div>

    <!-- ============================================================================ -->
    <!-- CARDS SECTION -->
    <!-- ============================================================================ -->
    <div v-show="activeSection === 'cards'" class="animate-section">
      <!-- Card Comparison -->
      <div class="row q-col-gutter-lg q-mb-lg">
        <!-- BaseCard -->
        <div class="col-12 col-md-4">
          <base-card variant="elevated" clickable>
            <template #header>
              <div class="text-h6 text-weight-bold text-primary">BaseCard</div>
              <div class="text-caption text-grey-6">General Use ⭐⭐⭐⭐⭐</div>
            </template>
            
            <p class="text-body2 text-grey-7">
              ✅ Most flexible<br>
              ✅ Slots header/body/footer<br>
              ✅ 3 variants<br>
              ✅ 4 padding levels<br>
              ✅ Clickable
            </p>
            
            <template #footer>
              <base-button variant="primary" size="sm" full-width>
                Footer Action
              </base-button>
            </template>
          </base-card>
        </div>

        <!-- MetricCard -->
        <div class="col-12 col-md-4">
          <base-card variant="elevated">
            <div class="text-h6 text-weight-bold text-positive q-mb-xs">MetricCard</div>
            <div class="text-caption text-grey-6 q-mb-md">Dashboard ⭐⭐⭐⭐</div>
            
            <metric-card 
              label="Total Users"
              value="1,234"
              icon="people"
              trend="+12.5%"
              trend-type="positive"
              class="q-mb-md"
            />
            
            <p class="text-body2 text-grey-7">
              ✅ Specialized for metrics<br>
              ✅ Visual trends<br>
              ✅ Highlighted icon<br>
              ✅ Elegant hover
            </p>
          </base-card>
        </div>

        <!-- InfoCard -->
        <div class="col-12 col-md-4">
          <base-card variant="elevated">
            <div class="text-h6 text-weight-bold text-info q-mb-xs">InfoCard</div>
            <div class="text-caption text-grey-6 q-mb-md">Informative ⭐⭐⭐⭐</div>
            
            <info-card 
              title="Important Info"
              subtitle="With icon and context"
              icon="info"
              icon-color="#1976d2"
              separator
              class="q-mb-md"
            >
              <p class="text-body2 text-grey-7">
                ✅ Optional colored header<br>
                ✅ Icon + title + subtitle<br>
                ✅ Visual separator<br>
                ✅ Actions slot
              </p>
              
              <template #actions>
                <base-button variant="secondary" size="sm" full-width>
                  Learn More
                </base-button>
              </template>
            </info-card>
          </base-card>
        </div>
      </div>

      <!-- Card Documentation -->
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <info-card
            title="BaseCard"
            subtitle="Most flexible card component"
            icon="view_agenda"
            icon-color="#1976d2"
          >
            <pre class="code-block">import { BaseCard } from '@shared'

&lt;base-card variant="elevated"&gt;
  &lt;template #header&gt;
    &lt;div class="text-h6"&gt;Card Title&lt;/div&gt;
  &lt;/template&gt;
  
  Card content here
  
  &lt;template #footer&gt;
    &lt;base-button&gt;Action&lt;/base-button&gt;
  &lt;/template&gt;
&lt;/base-card&gt;</pre>
          </info-card>
        </div>

        <div class="col-12 col-md-6">
          <info-card
            title="MetricCard & InfoCard"
            subtitle="Specialized card components"
            icon="dashboard"
            icon-color="#4caf50"
          >
            <pre class="code-block">import { MetricCard, InfoCard } from '@shared'

&lt;metric-card
  label="Total Users"
  :value="1234"
  icon="people"
  trend="+12%"
  trend-type="positive"
/&gt;

&lt;info-card
  title="Important Info"
  subtitle="Description"
  icon="info"
  icon-color="#1976d2"
&gt;
  Content here
&lt;/info-card&gt;</pre>
          </info-card>
        </div>
      </div>
    </div>

    <!-- ============================================================================ -->
    <!-- FORMS SECTION -->
    <!-- ============================================================================ -->
    <div v-show="activeSection === 'forms'" class="animate-section">
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-6">
          <base-card>
            <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">Form Inputs</h3>
            
            <base-input
              v-model="formData.name"
              label="Full Name"
              placeholder="Enter your name"
              class="q-mb-md"
            />

            <base-input
              v-model="formData.email"
              type="email"
              label="E-mail"
              placeholder="your@email.com"
              class="q-mb-md"
            />

            <base-select
              v-model="formData.category"
              :options="categories"
              label="Category"
              class="q-mb-md"
            />

            <base-multi-select
              v-model="formData.tags"
              :options="tagOptions"
              label="Tags"
              class="q-mb-md"
            />

            <base-textarea
              v-model="formData.message"
              label="Message"
              placeholder="Enter your message..."
              class="q-mb-md"
            />

            <div class="row q-gutter-sm">
              <base-button variant="secondary" @click="resetForm">
                Clear
              </base-button>
              <base-button variant="primary" @click="submitForm">
                Submit
              </base-button>
            </div>
          </base-card>
        </div>

        <div class="col-12 col-md-6">
          <base-card>
            <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">Date & Time</h3>
            
            <base-date-picker
              v-model="formData.date"
              label="Date"
              class="q-mb-md"
            />

            <base-time-picker
              v-model="formData.time"
              label="Time"
              class="q-mb-md"
            />

            <div class="text-body2 text-grey-7 q-mt-lg">
              <p><strong>Form Data:</strong></p>
              <pre class="code-block">{{ JSON.stringify(formData, null, 2) }}</pre>
            </div>
          </base-card>
        </div>
      </div>

      <!-- Form Documentation -->
      <div class="row q-col-gutter-lg">
        <div class="col-12">
          <info-card
            title="Form Components"
            subtitle="All available form input components"
            icon="edit"
            icon-color="#1976d2"
          >
            <pre class="code-block">import { 
  BaseInput, 
  BaseSelect, 
  BaseMultiSelect, 
  BaseTextarea,
  BaseDatePicker,
  BaseTimePicker,
  useFormRules
} from '@shared'

const { rules, emailRules } = useFormRules()

&lt;base-input v-model="name" label="Name" :rules="[rules.required]" /&gt;
&lt;base-input v-model="email" label="Email" :rules="emailRules" /&gt;
&lt;base-select v-model="category" :options="options" label="Category" /&gt;
&lt;base-multi-select v-model="tags" :options="tagOptions" label="Tags" /&gt;
&lt;base-textarea v-model="message" label="Message" /&gt;
&lt;base-date-picker v-model="date" label="Date" /&gt;
&lt;base-time-picker v-model="time" label="Time" /&gt;</pre>
          </info-card>
        </div>
      </div>
    </div>

    <!-- ============================================================================ -->
    <!-- METRICS SECTION -->
    <!-- ============================================================================ -->
    <div v-show="activeSection === 'metrics'" class="animate-section">
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-md-3">
          <metric-card
            label="Total Users"
            value="12,345"
            icon="people"
            trend="+15.3%"
            trend-type="positive"
          />
        </div>
        <div class="col-12 col-md-3">
          <metric-card
            label="Revenue"
            value="$45,678"
            icon="attach_money"
            trend="+8.2%"
            trend-type="positive"
          />
        </div>
        <div class="col-12 col-md-3">
          <metric-card
            label="Bounce Rate"
            value="23.4%"
            icon="trending_down"
            trend="-5.1%"
            trend-type="negative"
          />
        </div>
        <div class="col-12 col-md-3">
          <metric-card
            label="Sessions"
            value="8,901"
            icon="visibility"
            trend="+2.7%"
            trend-type="positive"
          />
        </div>
      </div>

      <!-- Metric Documentation -->
      <info-card
        title="MetricCard"
        subtitle="Dashboard metric cards with trends"
        icon="analytics"
        icon-color="#1976d2"
      >
        <pre class="code-block">import { MetricCard } from '@shared'

&lt;metric-card
  label="Total Users"
  value="12,345"
  icon="people"
  trend="+15.3%"
  trend-type="positive"
/&gt;

// Props:
// - label: string - Metric label
// - value: string | number - Metric value
// - icon: string - Material icon name
// - trend: string - Trend percentage
// - trend-type: 'positive' | 'negative' | 'neutral'</pre>
      </info-card>
    </div>

    <!-- ============================================================================ -->
    <!-- DESIGN TOKENS SECTION -->
    <!-- ============================================================================ -->
    <div v-show="activeSection === 'design'" class="animate-section">
      <!-- Colors -->
      <base-card class="q-mb-lg">
        <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">Color Palette</h3>
        <div class="row q-gutter-md">
          <div class="text-center">
            <div class="color-swatch" style="background: #1976d2;"></div>
            <div class="text-caption text-grey-7">Primary</div>
          </div>
          <div class="text-center">
            <div class="color-swatch" style="background: #4A9B7F;"></div>
            <div class="text-caption text-grey-7">Teal</div>
          </div>
          <div class="text-center">
            <div class="color-swatch" style="background: #28a745;"></div>
            <div class="text-caption text-grey-7">Success</div>
          </div>
          <div class="text-center">
            <div class="color-swatch" style="background: #ffc107;"></div>
            <div class="text-caption text-grey-7">Warning</div>
          </div>
          <div class="text-center">
            <div class="color-swatch" style="background: #dc3545;"></div>
            <div class="text-caption text-grey-7">Error</div>
          </div>
          <div class="text-center">
            <div class="color-swatch" style="background: #17a2b8;"></div>
            <div class="text-caption text-grey-7">Info</div>
          </div>
        </div>
      </base-card>

      <!-- Shadows -->
      <base-card class="q-mb-lg">
        <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">Shadows</h3>
        <div class="row q-gutter-lg">
          <div class="col-12 col-md-4">
            <div class="shadow-demo shadow-soft">
              <div class="text-weight-bold">Soft</div>
              <div class="text-caption">--shadow-soft</div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="shadow-demo shadow-medium">
              <div class="text-weight-bold">Medium</div>
              <div class="text-caption">--shadow-medium</div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="shadow-demo shadow-strong">
              <div class="text-weight-bold">Strong</div>
              <div class="text-caption">--shadow-strong</div>
            </div>
          </div>
        </div>
      </base-card>

      <!-- Spacing -->
      <base-card class="q-mb-lg">
        <h3 class="text-h6 text-weight-bold text-grey-8 q-mb-md">Spacing Scale</h3>
        <div class="row q-gutter-md items-end">
          <div v-for="(value, name) in spacingScale" :key="name" class="text-center">
            <div 
              class="spacing-demo" 
              :style="{ width: value, height: value }"
            ></div>
            <div class="text-caption text-grey-7">{{ name }}</div>
            <div class="text-caption text-grey-6">{{ value }}</div>
          </div>
        </div>
      </base-card>

      <!-- Design Tokens Documentation -->
      <info-card
        title="Design Tokens"
        subtitle="CSS variables for consistent styling"
        icon="palette"
        icon-color="#1976d2"
      >
        <pre class="code-block">/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;

/* Shadows */
--shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.05);
--shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-strong: 0 8px 32px rgba(0, 0, 0, 0.1);

/* Transitions */
--transition-fast: 200ms ease-in-out;
--transition-normal: 300ms ease-in-out;
--transition-slow: 500ms ease-in-out;

/* Usage */
.my-card {
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-soft);
  transition: box-shadow var(--transition-fast);
}

.my-card:hover {
  box-shadow: var(--shadow-medium);
}</pre>
      </info-card>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DemoPage - Design System Showcase
 * 
 * This page demonstrates all components and composables available in nettoolskit-ui-vue.
 * Copy this file to your project to test and explore the design system.
 * 
 * Usage:
 * 1. Copy this file to your project's pages directory
 * 2. Add a route to this page
 * 3. Import components from @shared (adjust path as needed)
 */

import { ref, computed } from 'vue'

// ============================================================================
// COMPONENTS
// Adjust import paths based on your project structure
// ============================================================================
import BaseButton from '../components/ui/BaseButton.vue'
import BaseChip from '../components/ui/BaseChip.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseInput from '../components/form/BaseInput.vue'
import BaseSelect from '../components/form/BaseSelect.vue'
import BaseMultiSelect from '../components/form/BaseMultiSelect.vue'
import BaseTextarea from '../components/form/BaseTextarea.vue'
import BaseDatePicker from '../components/form/BaseDatePicker.vue'
import BaseTimePicker from '../components/form/BaseTimePicker.vue'
import MetricCard from '../components/ui/MetricCard.vue'
import InfoCard from '../components/ui/InfoCard.vue'
import SectionHeader from '../components/ui/SectionHeader.vue'

// ============================================================================
// COMPOSABLES
// ============================================================================
import { useNotification } from '../composables/services/useNotification'
import { useDialog } from '../composables/ui/useDialog'
import { useResponsive } from '../composables/ui/useResponsive'
import { useTheme } from '../composables/ui/useTheme'

// ============================================================================
// COMPOSABLE USAGE
// ============================================================================
const { success, error, warning, info } = useNotification()
const dialog = useDialog()
const { isMobile, isDesktop, currentBreakpoint } = useResponsive()
const { 
  theme, 
  themeName: currentThemeName, 
  primaryColor, 
  isDark, 
  availableThemes,
  setTheme 
} = useTheme()

// ============================================================================
// SECTION NAVIGATION
// ============================================================================
const activeSection = ref('theme')

const sectionOptions = [
  { label: 'Theme', value: 'theme', title: 'Theme System', subtitle: 'Multi-theme support with runtime switching' },
  { label: 'Composables', value: 'composables', title: 'Composables', subtitle: 'Reusable logic: useNotification, useDialog, useResponsive, useDebounce' },
  { label: 'Buttons', value: 'buttons', title: 'Buttons & Chips', subtitle: 'Primary and secondary buttons with hover effects' },
  { label: 'Cards', value: 'cards', title: 'Cards', subtitle: 'Cards with hover elevation and border-radius' },
  { label: 'Forms', value: 'forms', title: 'Form Inputs', subtitle: 'Inputs with validation and focus states' },
  { label: 'Metrics', value: 'metrics', title: 'Metric Cards', subtitle: 'Dashboard metric cards with trends' },
  { label: 'Design', value: 'design', title: 'Design Tokens', subtitle: 'Colors, shadows, spacing, and typography' },
]

// ============================================================================
// THEME DEMO
// ============================================================================
const themeColors = computed(() => {
  if (!theme.value?.colors) return {}
  return {
    primary: theme.value.colors.primary,
    secondary: theme.value.colors.secondary,
    background: theme.value.colors.background,
    text: theme.value.colors.text,
    success: theme.value.colors.success,
    error: theme.value.colors.error,
  }
})

// ============================================================================
// FORM DEMO
// ============================================================================
const formData = ref({
  name: '',
  email: '',
  category: null,
  tags: [],
  message: '',
  date: '',
  time: ''
})

const categories = [
  { label: 'Technology', value: 'tech' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' }
]

const tagOptions = [
  { label: 'Important', value: 'important' },
  { label: 'Urgent', value: 'urgent' },
  { label: 'Review', value: 'review' },
  { label: 'Approved', value: 'approved' },
  { label: 'Pending', value: 'pending' }
]

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    category: null,
    tags: [],
    message: '',
    date: '',
    time: ''
  }
  info('Form cleared')
}

const submitForm = () => {
  console.log('Form data:', formData.value)
  success('Form submitted successfully!')
}

// ============================================================================
// DEBOUNCE DEMO
// ============================================================================
const searchTerm = ref('')
const lastSearch = ref('')

const handleDebouncedSearch = (value: string) => {
  if (value.trim()) {
    setTimeout(() => {
      lastSearch.value = value
    }, 500)
  }
}

// ============================================================================
// DESIGN TOKENS
// ============================================================================
const spacingScale = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
}
</script>

<style scoped lang="scss">
.demo-page {
  max-width: 1400px;
  margin: 0 auto;
}

.animate-section {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.color-swatch {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.shadow-demo {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

.shadow-soft {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.shadow-medium {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.shadow-strong {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.spacing-demo {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  border-radius: 4px;
}

.code-block {
  background: #f5f5f5;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #424242;
  margin: 0;
}
</style>
