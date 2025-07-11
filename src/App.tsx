import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const queryClient = new QueryClient();

const App = () => {
  const [isLoadingContent, setIsLoadingContent] = useState(true); // Контролирует готовность основного контента
  const [showSpinnerComponent, setShowSpinnerComponent] = useState(true); // Контролирует монтирование/размонтирование компонента спиннера
  const [isSpinnerFadingOut, setIsSpinnerFadingOut] = useState(false); // Сигнализирует спиннеру о начале исчезновения

  useEffect(() => {
    // Симулируем время загрузки контента
    const contentLoadTimer = setTimeout(() => {
      setIsLoadingContent(false); // Контент готов
      setIsSpinnerFadingOut(true); // Сообщаем спиннеру, что пора начинать исчезать
    }, 2500); // Контент будет готов через 2.5 секунды

    return () => clearTimeout(contentLoadTimer);
  }, []);

  useEffect(() => {
    if (isSpinnerFadingOut) {
      // После того как спиннер начал исчезать, ждем завершения анимации, затем размонтируем его
      const spinnerFadeOutDuration = 500; // Должно совпадать с длительностью CSS-перехода
      const unmountSpinnerTimer = setTimeout(() => {
        setShowSpinnerComponent(false);
      }, spinnerFadeOutDuration);

      return () => clearTimeout(unmountSpinnerTimer);
    }
  }, [isSpinnerFadingOut]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSpinnerComponent && <LoadingSpinner isFadingOut={isSpinnerFadingOut} />}
        {!showSpinnerComponent && ( // Рендерим основной контент только после размонтирования компонента спиннера
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;