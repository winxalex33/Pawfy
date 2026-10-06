import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PdpState } from './services/pdp-state';
import { CountdownBanner } from './components/countdown-banner';
import { HeaderSection } from './components/header';
import { AtfSection } from './components/atf';
import { ValuePropsBar } from './components/value-props-bar';
import { OwnerReviews } from './components/owner-reviews';
import { WeightRisks } from './components/weight-risks';
import { AsSeenIn } from './components/as-seen-in';
import { DosageCalculator } from './components/dosage-calculator';
import { IngredientsSection } from './components/ingredients';
import { WeeklyResults } from './components/weekly-results';
import { StatsCollage } from './components/stats-collage';
import { VetEndorsement } from './components/vet-endorsement';
import { HelpAllDogs } from './components/help-all-dogs';
import { CompareTable } from './components/compare-table';
import { LifeChangingResults } from './components/life-changing-results';
import { ConsistencyMatters } from './components/consistency-matters';
import { FaqSection } from './components/faq';
import { CustomerReviews } from './components/customer-reviews';
import { FooterSection } from './components/footer';
import { StickyAtc } from './components/sticky-atc';
import { SplitTestingToolbar } from './components/split-testing-toolbar';
import { ShopifyPayloadModal } from './components/shopify-payload-modal';
import { AnalyticsInspector } from './components/analytics-inspector';
import { PerformanceReportModal } from './components/performance-report-modal';
import { FeedingGuideModal } from './components/feeding-guide-modal';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CountdownBanner,
    HeaderSection,
    AtfSection,
    ValuePropsBar,
    OwnerReviews,
    WeightRisks,
    AsSeenIn,
    DosageCalculator,
    IngredientsSection,
    WeeklyResults,
    StatsCollage,
    VetEndorsement,
    HelpAllDogs,
    CompareTable,
    LifeChangingResults,
    ConsistencyMatters,
    FaqSection,
    CustomerReviews,
    FooterSection,
    StickyAtc,
    SplitTestingToolbar,
    ShopifyPayloadModal,
    AnalyticsInspector,
    PerformanceReportModal,
    FeedingGuideModal,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly state = inject(PdpState);
}
